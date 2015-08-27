function goToRoute(route) {
    Router.go(route);
}

function getParamValue(paramName) {
    return Router.current().params[paramName];
}

function getCurrentModelDefId() {
    return getParamValue("_id");
}

function getRootModelInstancePath(){
    return "/models/";
}

function getDefaultModelDefPath(){
    return `/modeldefs/${getCurrentModelDefId()}`;
}

function getDefaultModelPath(){
    return getRootModelInstancePath() + getCurrentModelDefId();
}

function getDefaultModelDefFieldPath(){
    return getDefaultModelDefPath() + "/fields";
}

RouterHelpers =  {

    getCurrentModelDefId: getCurrentModelDefId,
    getParamValue:getParamValue,

    goToHomePage() {
        goToRoute("/")
    },

    showModelList() {
        goToRoute(getDefaultModelPath());
    },

    showModelInstanceForm(modelId, mode) {
        goToRoute(getDefaultModelPath() + `/model/${modelId}/${mode}`);
    },

    showNewModelInstanceForm (modelId) {
        this.showModelInstanceForm(modelId, Form_Mode_New);
    },

    showEditModelInstanceForm(modelId) {
        this.showModelInstanceForm(modelId, Form_Mode_Edit);
    },


    /*Model def helpers*/

    showModelDefForm(modelId, mode) {
        goToRoute(getDefaultModelDefPath() + `/model/${modelId}/${mode}`);
    },

    showNewModelDefForm(modelId) {
        this.showModelDefForm(modelId, Form_Mode_New)
    },

    showEditModelDefForm(modelId) {
        this.showModelDefForm(modelId, Form_Mode_Edit)
    },


    // model def field

    showModelDefFieldForm(modelDefId, mode) {
        goToRoute(getDefaultModelDefFieldPath() + `/${mode}`);
    },

    showEditModelDefFieldForm(modelDefId, fieldIndex) {
        goToRoute(getDefaultModelDefFieldPath()+ `/${fieldIndex}/${Form_Mode_Edit}`);
    },

    showNewModelDefFieldForm(modelDefId) {
        this.showModelDefFieldForm(modelDefId, Form_Mode_New);
    }

    /*showEditModelDefAdvancedFieldForm(modelDefId, fieldIndex) {
     goToRoute(getDefaultModelDefPath() + "/fields/" + fieldIndex + "/advanced/" + Form_Mode_Edit);
     },*/
};