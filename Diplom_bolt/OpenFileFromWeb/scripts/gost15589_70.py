import adsk.core, adsk.fusion, adsk.cam, traceback, math, json

def get_parameter(parameters, name):
    return list(filter(lambda x: x.comment == name, parameters))[0]

def set_value(parameters, name, value):
    get_parameter(parameters, name).value = value / 10.0

def run(occurence, params):
    S = float(params['S'])#многоугольник
    k = float(params['k'])#высота головки
    d = float(params['d'])#диаметр стержня
    l = float(params['l'])#высота стержня
    l1 = float(params['l1'])#высота отверстия в стержне
    d3 = float(params['d3'])#диаметр отверстия в стержне
    b = float(params['b'])#длина резьбы
    l2 = float(params['l2'])
    h = float(params['h'])
    d4 = float(params['d4'])
    c = float(params['c'])


  
    app = adsk.core.Application.get()
    ui  = app.userInterface
    design = app.activeProduct
    components = design.allComponents
    rootComp = design.rootComponent

    comp = rootComp.occurrences.item(rootComp.occurrences.count-1).component
    par = comp.modelParameters

    set_value(par, "S", S)
    set_value(par, "k", k)
    set_value(par, "d", d)
    set_value(par, "l", l)
    set_value(par, "l1", l1)
    set_value(par, "d3", d3)
    set_value(par, "d4", d4)
    set_value(par, "d4_1", d4)
    set_value(par, "l2", l2)
    set_value(par, "l2_1", l2)
    set_value(par, "h", h)
    set_value(par, "c", c)
 
    comp = rootComp.occurrences.item(rootComp.occurrences.count-1).component

    if (h == 0):
        comp.features.revolveFeatures.itemByName("Revolve2").deleteMe()
        comp.sketches.itemByName("Sketch4").deleteMe()

    if (l1 == 0):
        comp.features.extrudeFeatures.itemByName("Extrude2").deleteMe()
        comp.sketches.itemByName("Sketch3").deleteMe()

    if (l2 == 0):
        comp.features.extrudeFeatures.itemByName("Extrude3").deleteMe()
        comp.features.extrudeFeatures.itemByName("Extrude4").deleteMe()
        comp.sketches.itemByName("Sketch5").deleteMe()
        comp.sketches.itemByName("Sketch6").deleteMe()

    # if (d >= 36):
    #     comp.features.chamferFeatures.itemByName("Chamfer1").deleteMe()


    threads = comp.features.threadFeatures
    threadDataQuery = threads.threadDataQuery
    defaultThreadType = threadDataQuery.defaultMetricThreadType
    recommendData = threadDataQuery.recommendThreadData(d/10.0, False, defaultThreadType)
    if recommendData[0] :
        threadInfo = threads.createThreadInfo(False, defaultThreadType, recommendData[1], recommendData[2])
        faces = adsk.core.ObjectCollection.create()
        faces.add(threads[0].faces[0])
        threadInput = threads.createInput(faces, threadInfo)
        if (b != l):
            threadInput.isFullLength = False
            threadInput.threadLength = adsk.core.ValueInput.createByReal(b/10.0)
        old = threads[0]
        threads.add(threadInput)
        old.deleteMe()