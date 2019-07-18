export default {
    description: "",
    id: 4,
    name: "Test",
    ownerUuid: "7c328ad1-cea5-410e-8dd8-6c7ca5a2e4f5",
    inputParameters: {
      "167681320": {
        id: 0,
        processors: [1367939198],
        transitionInput: 613075522,
        transition: 1302524813,
        passThrough: false
      },
      "200128345": {
        id: 0,
        processors: [664426778],
        transitionInput: null,
        transition: null,
        isPassThrough: true
      },
      "541825185": {
        id: 0,
        processors: [1367939198],
        transitionInput: 1361904960,
        transition: 1302524813,
        isPassThrough: false
      },
      "1400890506": {
        id: 0,
        processors: [1367939198],
        transitionInput: 613075522,
        transition: 1302524813,
        isPassThrough: false
      }
    },
    outputParameters: {
      "319555941": {
        id: 0,
        processor: 664426778,
        transitionOutput: 810037105,
        transition: 1302524813
      }
    },
    parameterTypes: {
      "647291991": {
        id: 0,
        name: "dataMappingRules",
        description: "Rules for data mapping."
      }
    },
    processorTypes: {
      "1059331404": {
        className: "processor.and.andprocessor",
        id: 0,
        name: "and",
        description: "Logical and linkage",
        inputs: [],
        outputs: []
      },
      "1166460450": {
        className: "processor.mapping.datamappingprocessor",
        id: 0,
        name: "dataMapping",
        description: "Data mapping of different data formats",
        inputs: [647291991],
        outputs: []
      }
    },
    processors: {
      "664426778": {
        type: 1166460450,
        id: 0,
        className: "processor.mapping.datamappingprocessor",
        inputs: [200128345],
        output: 319555941,
        transition: 1302524813,
        outputType: ""
      },
      "1367939198": {
        type: 1059331404,
        id: 0,
        className: "processor.and.andprocessor",
        inputs: [1400890506, 167681320, 541825185],
        output: 200128345,
        transition: 1302524813,
        outputType: "passthrough"
      }
    },
    serviceEndpoints: {
      "1730175899": {
        id: 52,
        uri: "http://www.example.com",
        functionCalls: [810037105],
        service: 2133601774,
        connectionType: "REST"
      }
    },
    services: {
      "1541948376": {
        uuid: "71f747a8-b12e-476a-bdb7-85c68c59c289",
        id: 95,
        name: "Mock Button",
        type: "APPLICATION_SERVICE",
        endpoints: [],
        inputEvents: []
      },
      "2133601774": {
        uuid: "71f747a8-b12e-476a-bdb7-85c68c59c282",
        id: 96,
        name: "System Information",
        type: "APPLICATION_SERVICE",
        endpoints: [1730175899],
        inputEvents: []
      }
    },
    transitionInputs: {
      "613075522": {
        id: 68,
        inputParameters: [1400890506, 167681320],
        inputEvent: {
          inputEventId: "live-information",
          service: 2133601774,
          responseEvent: false,
          functionCall: 0
        }
      },
      "1361904960": {
        id: 67,
        inputParameters: [541825185],
        inputEvent: {
          inputEventId: "button-event",
          service: 1541948376,
          isResponseEvent: false,
          functionCall: 0
        }
      }
    },
    transitionOutputs: {
      "810037105": {
        id: 52,
        outputParameters: [319555941],
        functionCall: {
          id: 52,
          functionId: "/log",
          serviceEndpoint: 1730175899,
          responseEvents: []
        }
      }
    },
    transitions: {
      "1302524813": {
        id: 62,
        sources: [],
        targets: [],
        inputs: [1400890506, 167681320, 541825185],
        outputs: [319555941],
        processors: [664426778, 1367939198]
      }
    }
};
