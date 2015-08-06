Template.model_form_buttons_phone.helpers
 #this is used to show either save or update button
  editingModel : ->
    Session.get(Editing_Model)

Template.button_cancel_model_phone.events
  'click' : ->
    currentModel = ModelHelpers.currentModel()
    FormHelpers.clearAllFormStates(Session)
    MobileRouteHelpers.showModelInstanceList(currentModel._id)
    return false