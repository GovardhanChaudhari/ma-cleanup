Admin_Email = "a@a.com";

Show_Model_Form="showModelForm";
Editing_Model="editingModel";
Current_Editing_Model_Data="currentEditingModelData";
Add_Model="addModel";
Current_Model="currentModel";
Current_Model_Id="currentModelId";
Shop_Owner_Id="shopOwnerId";
Editing_Field="editingField";
Editing_ModelDefId="editingModelDefId";

Field_Type="type";
Form_Mode_Edit="edit";
Form_Mode_New="new";

//Data_Type_Array='array';
Data_Type_Field='field';
Data_Type_String='string';
Data_Type_Boolean='boolean';
Data_Type_Text='text';
Data_Type_Password='password';
Data_Type_Combo='combo';
Data_Type_Derived='derived';
Data_Type_DropDown='drop_down';
Data_Type_Array='array';
Data_Type_Model_Name_Text='model_name_text';

ModelDb_Name = "model";

Role_Admin="admin";
Role_User="user";
Role_WebMaster="webmaster";

Client_Refreshed="clientRefreshed";

Base_Models = ["model","user","role","group","type","operation","appfeatures"];
AllReady_Published_Models = ["model","user","group","users","role","type","appfeatures"];

Search_Data="searchData";

Table_Operation = "operation";

Template_Map = {
	'boolean':"labeled_checkbox",
	'string':"labeled_input_text",
	'text':"labeled_input_text_area",
	'field' : "model_fields",
	//'combo' : "drop_down_component",
	'combo' : "data_list",
	'drop_down' : "drop_down_component",
	'date' : "labeled_date",
	'password' : "password_component",
	'int':"labeled_input_text",
	'float':"labeled_input_text",
	'derived' : "derived_property_component",
	'array' : "array_component",
	'model_name_text' : "model_name_text"

};

Pages={};

Derived_Property_Field_Names = ['property_one','property_two','property_three'];
Combo_Extra_Property_Field_Names = ['model_name','display_value','option_value','multiple'];


Affect_Model_Name='affect_model_name';
Affect_Model_Property='affect_model_property';
Affect_Filter_Property= 'affect_filter_property';
Affect_Operation = 'affect_operation';
Affect_Field_Names = [Affect_Model_Name,Affect_Model_Property,Affect_Filter_Property,Affect_Operation];

App_Components = ['labeled_input_text','labeled_input_text_area'];
Single_Valued_Templates = ['input_text','input_text_area',"date"];

FieldNames = [
	{name:"name"},
	{name:"type"}
];


// model def form component names
MDF_Name="name";
MDF_Fields="fields";
MDF_OwnerId = "ownerId";
MDF_ShowTableOperation = "showTableOperation";
MDF_IsBaseModel="isBaseModel";
MDF_IsPublished="isPublished";
MDF_SummaryPropertyName="summaryProperty";

PERMISSION_READ = "read";
PERMISSION_INSERT = "insert";
PERMISSION_UPDATE = "update";
PERMISSION_DELETE = "delete";

APP_FEATURE_EXPORT_CSV="export_to_csv";
APP_FEATURE_IMPORT_CSV="import_from_csv";

System_Config_File_Name="config.json";
System_Data_Config_Path = "system_data/config";
System_Config_File_Path=System_Data_Config_Path + "/" + System_Config_File_Name;
System_Data_Defaults_Path = "system_data/defaults";


ModelDefs_Json_File_Name = "modeldefs.json";
Admin_User_Json_File_Name = "admin_user.json";
Mail_Config_File_Name = "mail_config.json";

Blaze_Default_Template_Names=['with'];