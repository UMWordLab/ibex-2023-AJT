PennController.ResetPrefix()
var showProgressBar = false;

var shuffleSequence = seq(
                            "setcounter",
                            sepWith("sep", rshuffle(startsWith("chow"))),
                            "sendresults"
                         )
                         
var defaults = [
    "Separator", {
        transfer: 1000,                                      // How long between sentences? (ms)
        normalMessage: "Please wait for the next sentence."  // What is message presented between stims? Can be blank.
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],            /// What are options on Likert scale? Define both # of options and their labels.
        presentAsScale: true,                               /// Should it be presented as a scale? 'true' or 'false'
        instructions: "Use number keys or click boxes to answer.",    /// Brief instructions present on each trial
        leftComment: "(Bad)", rightComment: "(Good)"        /// Labels on end-points of scale
    }
];
                         
Template("Experiment.csv", row => {
    items.push(
        [[row.label, row.item] , "PennController", newTrial(
            newController("AcceptabilityJudgment", {s: row.sentence,
                            as: ["1", "2", "3", "4", "5", "6", "7"],  
                            presentAsScale: true,                             
                            instructions: "Use number keys or click boxes to answer.",    
                            leftComment: "(Bad)", 
                            rightComment: "(Good)"})
                .print()
                .log()
                .wait()
        )
        .log("sentence", row.sentence)
        .log("counter", __counter_value_from_server__)
        .log("label", row.label)
        .log("latinitem", row.item)]
    );
   return newTrial('_dummy_',null);
})

var items = [
    
    ["sep", "Separator", { }],
    
    ["setcounter", "__SetCounter__", { }],
 
    ["sendresults", "__SendResults__", { }],    
    
];