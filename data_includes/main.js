PennController.ResetPrefix()
var showProgressBar = false;

var shuffleSequence = seq(
                            "setcounter",
                            seq(rshuffle(startsWith("chow"))),
                            "sendresults"
                         )
                         
Template("Experiment.csv", row => {
    items.push(
        [[row.label, row.item] , "PennController", newTrial(
            newText("sentence", row.sentence)
                .center()
                .css("margin", "25px")
                .print(),
                
            newScale("acceptability", 7)
                .before( newText("(very bad)") )
                .after( newText("(very good)") )
                .callback( getText("warning").hidden() )
                .center()
                .log()
                .print(),
        
            newText("warning", "Please provide a judgment before you can continue")
                .center()
                .color("red")
                .css("margin", "10px")
                .hidden()
                .print(),
                
            newButton("continue", "Proceed")
                .print()
                .center()
                .css("margin", "25px")
                .wait( getScale("acceptability").test.selected().failure(getText("warning").visible()) )
                .log()
    )
    .log("sentence", row.sentence)
    .log("counter", __counter_value_from_server__)
    .log("label", row.label)
    .log("latinitem", row.item)]
    
   );
   return newTrial('_dummy_',null);
})

var items = [
    
    ["setcounter", "__SetCounter__", { }],
 
    ["sendresults", "__SendResults__", { }],    
    
];