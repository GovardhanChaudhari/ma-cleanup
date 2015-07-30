Template.model_def_form_tabs.created = FormHelpers.setFormGetValueFunction;

Template.model_def_form_tabs.rendered = ->
  template = this

  @getValue = ->
    data = {}
    ArrayUtils.each template.childComponents, (childComponent) ->
      data[childComponent.getName()] = childComponent.getValue()
      return
    editingModelDef = ModelDefHelpers.getEditingModelDef()
    if editingModelDef
      # get form data while editing
      #var modelDef = ModelDefHelpers.getModelDefById(editingModelDef._id);
      data.fields = editingModelDef.fields
    else
      # adding new model def
      data.fields = []
    data

  return


