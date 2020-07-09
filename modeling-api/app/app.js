import BpmnModeler from 'bpmn-js/lib/Modeler';

import emptyDiagram from '../resources/newDiagram.bpmn';

import hljs from 'highlight.js';

import * as samples from './samples.js'

// Initialize syntax highlighting
hljs.initHighlightingOnLoad();

// Initialize the modeler ///////////////////////

const myContainer = document.getElementById('js-drop-zone');

const modeler = new BpmnModeler({
  container: '#js-canvas'
});

function createNewDiagram(container) {
  return openDiagram(emptyDiagram, container);
}

async function openDiagram(xml, container) {
  try {
    
    await modeler.importXML(xml);

    container.classList.remove('with-error');
    container.classList.add('with-diagram');

  } catch (err) {

    console.error(err);

    container.classList.remove('with-diagram');
    container.classList.add('with-error');

    document.querySelector('#js-drop-zone pre').textContent = err.message;
  }
}



function loadSample(f) {
  createNewDiagram(myContainer).then(() => {
    f(modeler);

    let functionBody = f.toString().substring(1, 12);
    document.getElementById('code-payload').textContent = f.toString();
    hljs.highlightBlock(document.getElementById('code-payload'));
  });
}

createNewDiagram(myContainer).then(() => {

  document.getElementById('add-shapes-btn').addEventListener('click', (e) => {
  
      loadSample(samples.loadSampleOne);    
  });

  document.getElementById('comp-shapes-btn').addEventListener('click', (e) => {
  
    loadSample(samples.loadSampleTwo);    
});

});


  // Prepare APIs we will use for modelling ///////////////////////

  /* samples.loadSampleOne(modeler);

  const canvas = modeler.get('canvas'), 
    elementRegistry = modeler.get('elementRegistry'),
    rootElement = canvas.getRootElement();

  const elementFactory = modeler.get('elementFactory'),
    bpmnFactory = modeler.get('bpmnFactory'),
    modeling = modeler.get('modeling');
 */

/* document.getElementById('append-element').addEventListener('click', (e)=>{
  e.stopPropagation();
  e.preventDefault();

  let elementType = document.getElementById('append-type').value;
  
  const task = elementFactory.createShape({ 
    type: elementType
  });
  const boundaryEvent = elementFactory.createShape({
    type: "bpmn:BoundaryEvent"
  });
  const errorEventDef = bpmnFactory.create("bpmn:CompensateEventDefinition", {});
  const compensationTask = elementFactory.createShape({ 
    type: "bpmn:Task" 
  });
  const association = elementFactory.createConnection({
    id: "abc",
    type: "bpmn:Association"
  });

  boundaryEvent.host = task;

  boundaryEvent.businessObject.attachedToRef = task.businessObject;
  boundaryEvent.businessObject.eventDefinitions = [errorEventDef];

  compensationTask.businessObject.isForCompensation = true;

  association.businessObject.associationDirection = 'One';

  modeling.appendShape(startElement, task, { x: startElement.x + 200, y: startElement.y });
  modeling.appendShape(task, boundaryEvent, { x: task.x + 52, y: task.y + 80 });
  modeling.appendShape(task, compensationTask, { x: task.x + 200, y: task.y + 180 });
  modeling.connect(boundaryEvent, compensationTask, association);
  startElement = task;
}); */



/* const canvas = modeler.get('canvas');
const elementRegistry = modeler.get('elementRegistry');
var rootElement = canvas.getRootElement();
const startEvent = elementRegistry.get('StartEvent_1');

// Get APIs

// The diagram-js elementFactory used to create diagram shapes for diagram adding by the user
const elementFactory = modeler.get('elementFactory');

// The bpmn-js bpmnFactory used to create BPMN 2.0 known business objects
const bpmnFactory = modeler.get('bpmnFactory');

// The bpmn-js modeling API 
const modeling = modeler.get('modeling');
console.log(elementRegistry);
console.log(elementRegistry.get('StartEvent_1'));
debugger;
function addShape() {
  console.log(startEvent);
  const task = elementFactory.createShape({
    type: "bpmn:Task"
  });
  modeling.appendShape(startEvent, task, { x: 500, y: 500}, null);
}

document.getElementById('js-create-task').addEventListener('click', (e)=>{
  e.stopPropagation();
  e.preventDefault();
  
  addShape();

});
 */