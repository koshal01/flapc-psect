function zeros(rowLen, colLen) {
    return Array(rowLen).fill(0).map(row => new Array(colLen).fill(0))
}

function cumulative(arg) {
    var c = 0
    var carg = zeros(arg.length)
    for (let i = 0; i < arg.length; i++) {
        c = c + arg[i]
        carg[i] = c
    }
    return carg
}


function zerosFLAPC(colLen) {
    return Array(colLen).fill(0)
}

function swap(list, x, y) {
    var temp = list[x];
    list[x] = list[y];
    list[y] = temp;
    return list;
}

//following function calculates the flapc and sorts the lists based on it
export function flapc(heat_rate, pmax, pmin, fuel_cost, gen_no, cold_heat, bank_heat, thermal_constant, fixed_cost) {
    var cost = zerosFLAPC(pmax.length)
    var priority_list = [] //to save the flapc sorted in ascending order
    for (let i = 0; i < pmax.length; i++) {
        cost[i] = (((heat_rate[i][0] * (Math.pow(pmax[i], 3)) + heat_rate[i][1] * (Math.pow(pmax[i], 2)) + heat_rate[i][2] * (pmax[i]) + heat_rate[i][3]) * fuel_cost[i]) / pmax[i])
    }
    priority_list = cost

    //sorting
    for (let i = 0; i < pmax.length; i++) {
        for (let j = i + 1; j < pmax.length; j++) {
            if (cost[i] > cost[j]) {
                //organizing in ascending order as per flapc
                priority_list = swap(priority_list, i, j);
                gen_no = swap(gen_no, i, j);
                pmax = swap(pmax, i, j);
                pmin = swap(pmin, i, j);
                cold_heat = swap(cold_heat, i, j)
                bank_heat = swap(bank_heat, i, j)
                thermal_constant = swap(thermal_constant, i, j)
                fixed_cost = swap(fixed_cost, i, j)
            }
        }
    }
    return [priority_list, pmax, pmin, gen_no, cold_heat, bank_heat, thermal_constant, fixed_cost];
}

export function allot_generator_basic(priority_list, pmax, pmin, load_data, gen_no) {
    //computes the cumulative maximum and minimum power for the n combinations as per flpac method
    var cum_pmin = cumulative(pmin)
    var cum_pmax = cumulative(pmax)

    var allotment_matrix = zeros(load_data.length, pmax.length)
    var tableData = zeros(load_data.length, gen_no.length + 2)

    for (let i = 0; i < load_data.length; i++) {
        if (load_data[i] < cum_pmin[0]) {
            // console.log("Minimum load at hour " + i + 1 + "has to be greater than" + pmin[0] + " MW for successful implementation of flpac based method")
            tableData[i][gen_no.length] = pmin[0]
        }
        else if (load_data[i] > cum_pmax[cum_pmax.length - 1]) {
            // console.log("All the generators together are unable to supply the load demand at hour" + i + 1)
            tableData[i][gen_no.length + 1] = cum_pmax[cum_pmax.length - 1]
        }
        else {
            //generates the allotment of generators for each load data given
            for (let j = 0; j < pmax.length; j++) {
                if (load_data[i] <= cum_pmax[j]) {
                    for (let k = 0; k < j + 1; k++) {
                        allotment_matrix[i][k] = 1
                    }
                    break;
                }
            }
        }
    }

    return [allotment_matrix, tableData];
}

function load_distribution(allotment_matrix, load_data, pmax, pmin, cooling_banking) {
    for (let i = 0; i < allotment_matrix.length; i++) {
        var c = load_data[i];
        for (let j = 0; j < allotment_matrix[i].length; j++) {
            if (allotment_matrix[i][j] === 0) {
                break;
            }
            else if (allotment_matrix[i][j] === 1) {
                if (c > pmax[j]) {
                    if (j < (allotment_matrix[0].length - 1)) {
                        var d = c - pmax[j];
                        // console.log(pmin)
                        if (d < pmin[j + 1]) {
                            cooling_banking[i][j] = c - pmin[j + 1]
                            c = pmin[j + 1]
                        }
                        else {
                            cooling_banking[i][j] = pmax[j]
                            c -= pmax[j]
                        }
                    }
                    else {
                        cooling_banking[i][j] = pmax[j]
                        c -= pmax[j]
                    }
                }
                else if (c <= pmax[j]) {
                    cooling_banking[i][j] = c
                }
            }
        }
    }

    return cooling_banking
}


export function commitment(allotment_matrix, cold_heat, bank_heat, fixed_cost, thermal_constant, fuel_cost, load_data, pmax, pmin) {
    var cool_bank = zeros(allotment_matrix.length, pmax.length)

    for (let i = 0; i < allotment_matrix[0].length; i++) {
        let j = 0;
        while (j < allotment_matrix.length) {
            if (allotment_matrix[j][i] === 0) {
                cool_bank[j][i] = "Not Started Yet"
                j += 1
            }
            else if (j === allotment_matrix.length - 1) {
                break;
            }
            else if (allotment_matrix[j][i] === 1) {
                var t = 0;
                for (let k = j + 1; k < allotment_matrix.length; k++) {
                    if (allotment_matrix[k][i] === 0) {
                        t = t + 1;
                        if (t === allotment_matrix.length - j - 1) {
                            j = k + 1;
                            for (let l = k - t + 1; l < k + 1; l++) {
                                cool_bank[l][i] = "Shutdown";
                            }
                        }
                    }   

                    else if (allotment_matrix[k][i] === 1) {
                        var cooling = fixed_cost[i] + cold_heat[i] * fuel_cost[i] * (1 - Math.exp(-t / thermal_constant[i]))
                        var banking = fixed_cost[i] + bank_heat[i] * fuel_cost[i] * t
                        if (banking < cooling) {
                            for (let l = k - t; l < k; l++) {
                                cool_bank[l][i] = "Banking Mode"
                            }
                        }

                        else if (cooling < banking) {
                            for (let l = k - t; l < k; l++) {
                                cool_bank[l][i] = "Shutdown"
                            }
                        }
                        if (t > 0) {
                            j = k;
                            break;
                        } else {
                            j += 1;
                            break;
                        }
                    }
                }
            }

        }

    }

    var commitment_matrix = load_distribution(allotment_matrix, load_data, pmax, pmin, cool_bank)
    return commitment_matrix;
}

export function print_result(commitment_matrix, gen_no, pmax, pmin, priority_list, updatedTable) {
    var updatedPriorityList = zeros(gen_no.length, 4)
    
    for (let i = 0; i < pmax.length; i++) {
        updatedPriorityList[i][0] = gen_no[i];
        updatedPriorityList[i][1] = priority_list[i].toFixed(3);
        updatedPriorityList[i][2] = pmin[i];
        updatedPriorityList[i][3] = pmax[i];
    }
    
    for (let i = 0; i < commitment_matrix.length; i++) {
        for (let j = 0; j < commitment_matrix[0].length; j++) {
            updatedTable[i][j] = commitment_matrix[i][j]
        }
    }
    
    return [updatedPriorityList, updatedTable];
}