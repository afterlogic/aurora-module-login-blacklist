<?php
/**
 * @copyright Copyright (c) 2017, Afterlogic Corp.
 * @license AGPL-3.0 or AfterLogic Software License
 *
 * This code is licensed under AGPLv3 license or AfterLogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\LoginBlackList;

/**
 * @package Modules
 */
class Module extends \Aurora\System\Module\AbstractModule
{

	/***** private functions *****/
	/**
	 * Initializes Files Module.
	 * 
	 * @ignore
	 */
	public function init() 
	{
	}

	/***** private functions *****/
	
	/***** public functions *****/

	public function SaveBlackList($BlackList)
    {
        $this->setConfig('LoginBlackList', $BlackList);
        return $this->saveModuleConfig();
    }


    public function GetSettings()
    {
        return [
            'LoginBlackList' => $this->getConfig('LoginBlackList', '')
        ];
    }

    /**
     * @param $sLogin
     * @return bool
     */
    public function LoginIsBlacklisted($sLogin)
    {
        $sRules = $this->getConfig('LoginBlackList', '');
        $aRules = [];
        $aMatches = [];

        if (!empty($sRules)) {
            $aRules = explode(PHP_EOL, $sRules);
        }

        foreach($aRules as $sRegexp) {
            if (empty($sRegexp)) {
                continue;
            }

            if (preg_match($sRegexp, $sLogin, $aMatches)) {
                return true;
            }
        }

        return false;
    }
}
