export default function loadSample(modeler) {

    /*
    *   The diagram-js elementFactory used to create diagram shapes for diagram adding by the user
    */ 

    
    const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

    const startEvent = elementRegistry.get('StartEvent_1');

    const task = elementFactory.createShape({
        type: "bpmn:Task"
    });


    modeling.appendShape(startEvent, 
        task, 
        { 
            x: Number(startEvent.x) + 200, 
            y: Number(startEvent.y) + Number(startEvent.height) / 2 
        });


}