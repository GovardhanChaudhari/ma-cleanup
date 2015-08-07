/**
 * Created by gvc on 07-08-2015.
 */
MobileUtils = {
    isPhoneOrTablet:function(){
        return Meteor.Device.isPhone() || Meteor.Device.isTablet();
    }
};