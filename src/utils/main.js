import { allot_generator_basic, print_result, commitment, flapc } from './genModule';

export function getPriorityList(unitList, load_data) {
    var heat_rate = Array(unitList.length).fill(0).map(row => new Array(4).fill(0))
    var ggen_no = []
    var gpmax = []
    var gpmin = []
    var fuel_cost = []
    var gcold_heat = []
    var gbank_heat = []
    var gthermal_constant = []
    var gfixed_cost = []
    
    for (let i = 0; i < unitList.length; i++) {
        heat_rate[i] = unitList[i].heatRate;
        ggen_no[i] = unitList[i].unitName;
        gpmax[i] = unitList[i].pmax;
        gpmin[i] = unitList[i].pmin;
        fuel_cost[i] = unitList[i].fuelCost;
        gcold_heat[i] = unitList[i].coldHeat;
        gbank_heat[i] = unitList[i].bankHeat;
        gthermal_constant[i] = unitList[i].thermalConstant;
        gfixed_cost[i] = unitList[i].fixedCost;
    }

    //flapc and sorting based on flapc
    const [priority_list, pmax, pmin, gen_no, cold_heat, bank_heat, thermal_constant, fixed_cost] = flapc(heat_rate, gpmax, gpmin, fuel_cost, ggen_no, gcold_heat, gbank_heat, gthermal_constant, gfixed_cost)
    console.log(priority_list)
    //generates an allotment matrix for the n combinations available as per flapc method
    const [allotment_matrix, tableData] = allot_generator_basic(priority_list, pmax, pmin, load_data, gen_no)

    //Generates an commitment matrix based on the load data given
    var commitment_matrix = commitment(allotment_matrix, cold_heat, bank_heat, fixed_cost, thermal_constant, fuel_cost, load_data, pmax, pmin)

    //prints the result
    const [updatedPriorityList, updatedTableData] = print_result(commitment_matrix, gen_no, pmax, pmin, priority_list, tableData)

    console.log('allotment matrizx')
    console.log(allotment_matrix)
    console.log('tableData')
    console.log(tableData)
    console.log('PriorityList')
    console.log(updatedPriorityList)

    return [updatedPriorityList, updatedTableData, gen_no];
}