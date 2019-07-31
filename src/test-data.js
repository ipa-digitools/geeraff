export const integrationFlow = {
    "id": 228,
    "name": "Test",
    "description": "",
    "organisationId": "7c328ad1-cea5-410e-8dd8-6c7ca5a2e4f5",
    "services": {
        "2101929317": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 580,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [],
            "inputEvents": []
        },
        "1327646115": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 586,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [21802335],
            "inputEvents": []
        },
        "1578296746": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 582,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [],
            "inputEvents": []
        },
        "2135273829": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 595,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [849896075],
            "inputEvents": []
        },
        "817032092": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 603,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [],
            "inputEvents": []
        },
        "722364287": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 607,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [294809813],
            "inputEvents": []
        },
        "325268712": {
            "uuid": "32801d88-34cf-4836-8cc1-7e0d9c54dacd",
            "id": 600,
            "name": "SmartObjectNodeTest3",
            "type": "APPLICATION_SERVICE",
            "endpoints": [],
            "inputEvents": []
        }
    },
    "serviceEndpoints": {
        "21802335": {
            "id": 587,
            "uri": "",
            "functionCalls": [2096560554],
            "service": 1327646115,
            "connectionType": "REST"
        },
        "849896075": {
            "id": 596,
            "uri": "",
            "functionCalls": [547006514],
            "service": 2135273829,
            "connectionType": "REST"
        },
        "294809813": {
            "id": 608,
            "uri": "",
            "functionCalls": [911967113],
            "service": 722364287,
            "connectionType": "REST"
        }
    },
    "transitions": {
        "871021774": {
            "id": 581,
            "sources": [],
            "targets": [],
            "inputs": [1222265305],
            "outputs": [196791467],
            "processors": [1819929916, 702852266]
        },
        "37284893": {
            "id": 591,
            "sources": [],
            "targets": [],
            "inputs": [1766096270],
            "outputs": [803053510],
            "processors": [2114135268]
        },
        "242302047": {
            "id": 599,
            "sources": [],
            "targets": [],
            "inputs": [1860755852, 1306259808],
            "outputs": [1096189325],
            "processors": [666652069]
        }
    },
    "transitionOutputs": {
        "2096560554": {
            "id": 588,
            "outputParameters": [196791467],
            "functionCall": {
                "id": 588,
                "functionId": "function1",
                "serviceEndpoint": 21802335,
                "responseEvents": []
            }
        },
        "547006514": {
            "id": 597,
            "outputParameters": [803053510],
            "functionCall": {
                "id": 597,
                "functionId": "function2",
                "serviceEndpoint": 849896075,
                "responseEvents": []
            }
        },
        "911967113": {
            "id": 609,
            "outputParameters": [1096189325],
            "functionCall": {
                "id": 609,
                "functionId": "functionWithResponse",
                "serviceEndpoint": 294809813,
                "responseEvents": [1222265305, 1766096270]
            }
        }
    },
    "transitionInputs": {
        "255108653": {
            "id": 583,
            "inputParameters": [1222265305],
            "inputEvent": {
                "inputEventId": "EVENT1",
                "service": 1578296746,
                "responseEvent": true,
                "functionCall": 911967113
            }
        },
        "420119886": {
            "id": 592,
            "inputParameters": [1766096270],
            "inputEvent": {
                "inputEventId": "EVENT1",
                "service": 2101929317,
                "responseEvent": true,
                "functionCall": 911967113
            }
        },
        "1167851557": {
            "id": 604,
            "inputParameters": [1860755852],
            "inputEvent": {
                "inputEventId": "SIMPLE_EVENT1",
                "service": 817032092,
                "responseEvent": false,
                "functionCall": 0
            }
        },
        "1098873659": {
            "id": 601,
            "inputParameters": [1306259808],
            "inputEvent": {
                "inputEventId": "SIMPLE_EVENT2",
                "service": 325268712,
                "responseEvent": false,
                "functionCall": 0
            }
        }
    },
    "inputParameters": {
        "1222265305": {
            "id": 584,
            "processors": [1819929916],
            "transitionInput": 255108653,
            "transition": 871021774,
            "passThrough": false
        },
        "1766096270": {
            "id": 593,
            "processors": [2114135268],
            "transitionInput": 420119886,
            "transition": 37284893,
            "passThrough": false
        },
        "1860755852": {
            "id": 605,
            "processors": [],
            "transitionInput": 1167851557,
            "transition": 242302047,
            "passThrough": false
        },
        "1306259808": {
            "id": 602,
            "processors": [666652069],
            "transitionInput": 1098873659,
            "transition": 242302047,
            "passThrough": false
        }
    },
    "outputParameters": {
        "196791467": {
            "id": 589,
            "processor": 1819929916,
            "transitionOutput": 2096560554,
            "transition": 871021774
        },
        "803053510": {
            "id": 598,
            "processor": 2114135268,
            "transitionOutput": 547006514,
            "transition": 37284893
        },
        "1096189325": {
            "id": 610,
            "processor": 666652069,
            "transitionOutput": 911967113,
            "transition": 242302047
        }
    },
    "processors": {
        "1819929916": {
            "type": 0,
            "id": 585,
            "className": "processor.and.andprocessor",
            "inputs": [1222265305],
            "output": 196791467,
            "transition": 871021774,
            "outputType": "",
            "pattern": "{\"mapping\":[{\"source\":[{\"path\":\"/dataObject\",\"type\":\"ARRAY\",\"items\":{\"path\":\"\",\"template\":\" : {type : integer, format : int64}\"},\"uniqueEventId\":{\"serviceUuid\":\"32801d88-34cf-4836-8cc1-7e0d9c54dacd\",\"eventId\":\"SIMPLE_EVENT2\"}}],\"target\":{\"path\":\"/dataObject\",\"type\":\"STRING\",\"items\":{\"path\":\"\",\"template\":\"\"},\"template\":\"${/dataObject}\"}}],\"template\":\"{\\\"dataObject\\\":{\\\"type\\\":\\\"string\\\"}}\"}"
        },
        "702852266": {
            "type": 0,
            "id": 590,
            "className": "processor.and.andprocessor",
            "inputs": [],
            "output": 0,
            "transition": 871021774,
            "pattern": "null"
        },
        "2114135268": {
            "type": 0,
            "id": 594,
            "className": "processor.or.orprocessor",
            "inputs": [1766096270],
            "output": 803053510,
            "transition": 37284893,
            "outputType": "",
            "pattern": "null"
        },
        "666652069": {
            "type": 0,
            "id": 606,
            "className": "processor.or.orprocessor",
            "inputs": [1306259808],
            "output": 1096189325,
            "transition": 242302047,
            "outputType": "",
            "pattern": "{\"mapping\":[{\"source\":[{\"path\":\"/dataObject\",\"type\":\"ARRAY\",\"items\":{\"path\":\"\",\"template\":\" : {type : integer, format : int64}\"},\"uniqueEventId\":{\"serviceUuid\":\"32801d88-34cf-4836-8cc1-7e0d9c54dacd\",\"eventId\":\"SIMPLE_EVENT2\"}}],\"target\":{\"path\":\"/dataObject\",\"type\":\"STRING\",\"items\":{\"path\":\"\",\"template\":\"\"},\"template\":\"${/dataObject}\"}}],\"template\":\"{\\\"dataObject\\\":{\\\"type\\\":\\\"string\\\"}}\"}"
        }
    },
    "processorTypes": {},
    "parameterTypes": {}
}


export const phylogeny = {
  name: "Hominoidea",
  children: [
    {
      name: "Hylobatidae"
    },
    {
      name: "Hominidae",
      children: [
        {
          name: "Ponginae"
        },
        {
          name: "Hominiae",
          children: [
            {
              name: "Gorilini"
            },
            {
              name: "Hominini",
              children: [
                {
                  name: "Panina"
                },
                {
                  name: "Hominina",
                  children: [
                    {
                      name: "Australopithecus"
                    },
                    {
                      name: "Kenyanthropus platops"
                    },
                    {
                      name: "Paranthropus"
                    },
                    {
                      name: "Homo",
                      children: [
                        {
                          name: "Homo habilis"
                        },
                        {
                          name: "Homo rudolfensis"
                        },
                        {
                          name: "Homo erectus",
                          children: [
                            {
                              name: "Homo ergaster"
                            },
                            {
                              name: "Homo antecessor"
                            },
                            {
                              name: "Homo heidelbergensis",
                              children: [
                                {
                                  name: "Homo neanderthalensis"
                                }
                              ]
                            },
                            {
                              name: "Homo sapiens"
                            }
                          ]
                        },
                        {
                          name: "Australopithecus sediba"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
