'use strict';

var
	ko = require('knockout'),
	_ = require('underscore'),
	
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

module.exports = {
	ServerModuleName: 'LoginBlackList',
	HashModuleName: 'loginBlackList',
    LoginBlackList: "",
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['%ModuleName%'];

			
		if (!_.isEmpty(oAppDataSection))
		{
			this.LoginBlackList = Types.pString(oAppDataSection.LoginBlackList, this.LoginBlackList);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 * 
	 * @param {string} sEnableModule
	 */
	update: function (sEnableModule)
	{
		this.enableModule(sEnableModule === '1');
	}
};
