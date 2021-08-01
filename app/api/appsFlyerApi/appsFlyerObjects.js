export const AppsFlyerObjectForNonOrganicIOS = {
    "status": "success",
    "type": "onInstallConversionDataLoaded",
    "data": {
        "click_time": "2019-04-07 13:44:43.384",
        "af_ad_id": "{{banner_id}}_{{geo}}_{{age}}_{{campaign_id}}_{{gender}}_{{impression_weekday}}_{{impression_hour}}_{{user_timezone}}",
        "af_status": "Non-organic",
        "clickid": "{clickid}",
        "cost_cents_USD": "0",
        "is_first_launch": false,
        "af_adset_id": "{{advertiser_id}}",
        "install_time": "2019-04-07 13:50:17.483",
        "af_ad": "{{search_phrase}}",
        "sha1_idfa": "6661A1AB-4CCC-4CF1-AE30-2B5498BCAC0E",
        "campaign": "ios_fanalytics_smm_ru_mytarget-app_um",
        "af_adset": "{{campaign_name}}",
        "media_source": "mail.ru_int",
        "af_click_lookback": "30d",
        "orig_cost": "0.0"
    }
}

export const testAMS = {
    "campaign": "media-appsflyer2",
}

export const AppsFlyerObjectForOrganicIOS = {
    "af_status": "Organic",
    "af_message": "organic install"
}

export const AppsFlyerObjectForOrganicAndroid = {
    data: {
        af_message: "organic install",
        af_status: "Organic",
        is_first_launch: "false"
    },
    status: "success",
    type: "onInstallConversionDataLoaded"
}