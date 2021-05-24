# Author-Autodesk Inc.
# Description-This is sample of opening files from web page.

import adsk.core
import adsk.fusion
import adsk.cam
import traceback
import json
from .scripts import gost15589_70
from .scripts import gost15590_70
from .scripts import gost15591_70
from .scripts import gost7798_70
from .scripts import gost7811_70

commandDefinition = None
toolbarControl = None
sampleHTMLFileName = 'Sample.html'

handlers = []



def formatMsg(args):
    webArgs = adsk.core.WebRequestEventArgs.cast(args)
    Description = str(webArgs.privateInfo)
    return Description


class OpenFromWebExecutedEventHandler(adsk.core.CommandEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface

            import webbrowser
            import os
            webbrowser.open("http://localhost:4200/")
        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


class OpenFromWebCreatedEventHandler(adsk.core.CommandCreatedEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface

            # Connect to the command executed event.
            cmd = args.command
            onExecute = OpenFromWebExecutedEventHandler()
            cmd.execute.add(onExecute)
            handlers.append(onExecute)
        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


class InsertingFromURLEventHandler(adsk.core.WebRequestEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface
            msg = "The InsertingFromURL event is fired.\n\n"
            msg += formatMsg(args)
            ui.messageBox(msg)

        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


class InsertedFromURLEventHandler(adsk.core.WebRequestEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface
            design = app.activeProduct
            rootComp = design.rootComponent
            occurence = rootComp.occurrences.item(rootComp.occurrences.count-1)

            Description = formatMsg(args)

            params = json.loads(Description)
            gost = str(params['GOST'])

            if (gost == "15589-70"):
                gost15589_70.run(occurence, params) #запуск скрипта
            if (gost == "15590-70"):
                gost15590_70.run(occurence, params)
            if (gost == "15591-70"):
                gost15591_70.run(occurence, params)
            if (gost == "7798-70"):
                gost7798_70.run(occurence, params)
            if (gost == "7811-70"):
                gost7811_70.run(occurence, params)
            
            ui.messageBox(Description)

        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


class OpeningFromURLEventHandler(adsk.core.WebRequestEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface
            msg = "The OpeningFromURL event is fired.\n\n"
            msg += formatMsg(args)
            ui.messageBox(msg)

        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


class OpenedFromURLEventHandler(adsk.core.WebRequestEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        ui = None
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface
            design = app.activeProduct
            rootComp = design.rootComponent
            occurence = rootComp.occurrences.item(rootComp.occurrences.count-1)
            parametres = occurence.component.parentDesign.allParameters

            msg = "The OpenedFromURL event is fired.\n\n"
            msg += formatMsg(args)
            ui.messageBox(msg)

        except:
            if ui:
                ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


def run(context):
    ui = None
    try:
        commandId = 'OpenFileFromWebCommandIdPy'
        commandName = 'Open Files from a Web Page'
        commandDescription = 'This is a sample of opening files from web page.'
        panelId = 'SolidScriptsAddinsPanel'

        app = adsk.core.Application.get()
        ui = app.userInterface

        # create the command definition
        commandDefinition = ui.commandDefinitions.itemById(commandId)
        # delete any existing command definition, and just recreate it
        if commandDefinition:
            commandDefinition.deleteMe()
        commandDefinition = ui.commandDefinitions.addButtonDefinition(
            commandId, commandName, commandDescription)
        onCommandCreated = OpenFromWebCreatedEventHandler()
        commandDefinition.commandCreated.add(onCommandCreated)
        # keep the handler referenced beyond this function
        handlers.append(onCommandCreated)

        # insert the command into the model:add-ins toolbar
        toolbarControls = ui.allToolbarPanels.itemById(panelId).controls
        # delete any existing control, and just recreate it
        global toolbarControl
        toolbarControl = toolbarControls.itemById(commandId)
        if toolbarControl:
            toolbarControl.deleteMe()
        toolbarControl = toolbarControls.addCommand(commandDefinition)

        onInsertingFromURL = InsertingFromURLEventHandler()
        app.insertingFromURL.add(onInsertingFromURL)
        handlers.append(onInsertingFromURL)

        onInsertedFromURL = InsertedFromURLEventHandler()
        app.insertedFromURL.add(onInsertedFromURL)
        handlers.append(onInsertedFromURL)

        onOpeningFromURL = OpeningFromURLEventHandler()
        app.openingFromURL.add(onOpeningFromURL)
        handlers.append(onOpeningFromURL)

        onOpenedFromURL = OpenedFromURLEventHandler()
        app.openedFromURL.add(onOpenedFromURL)
        handlers.append(onOpenedFromURL)

        ui.messageBox("The command is added to MODEL:ADD-INS panel.")
    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


def stop(context):
    ui = None
    try:
        global commandDefinition
        if commandDefinition:
            commandDefinition.deleteMe()
            commandDefinition = None
        global toolbarControl
        if toolbarControl:
            toolbarControl.deleteMe()
            toolbarControl = None

    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))
