define(['ojs/ojcore'], (oj) => {

    /**
     * @description Factory Module to handle the Language in Oracle JET Applications
     * @author Daniel Merchan Garcia
     */
    const Languages = {
        
        /**
         * @description Oracle JET supported languages
         * 
         * @since 6.1.0
         * @author Daniel Merchan Garcia
         * 
         * @return {array} supportedLanguages 
         * @example
         * {
         *  name: 'Spanish',
         *  locale: 'es'
         * } 
         */
        supportedLanguages: [
            {
                name: 'Arabic',
                locale: 'ar-SA'
            },
            {
                name: 'Brazilian Portuguese',
                locale: 'pt-BR'
            },
            {
                name: 'Canadian French',
                locale: 'fr-CA'
            },
            {
                name: 'Czech',
                locale: 'cs'
            },
            {
                name: 'Danish',
                locale: 'da'
            },
            {
                name: 'Dutch',
                locale: 'nl'
            },
            {
                name: 'English',
                locale: 'en'
            },
            {
                name: 'English USA',
                locale: 'en-US'
            },
            {
                name: 'Finnish',
                locale: 'fi'
            },
            {
                name: 'French',
                locale: 'fr'
            },
            {
                name: 'German',
                locale: 'de'
            },
            {
                name: 'Greek',
                locale: 'el'
            },
            {
                name: 'Hebrew',
                locale: 'he'
            },
            {
                name: 'Hungarian',
                locale: 'hu'
            },
            {
                name: 'Italian',
                locale: 'it'
            },
            {
                name: 'Japanese',
                locale: 'jp'
            },
            {
                name: 'Korean',
                locale: 'ko'
            },
            {
                name: 'Norwegian',
                locale: 'no'
            },
            {
                name: 'Polish',
                locale: 'pl'
            },
            {
                name: 'Portuguese',
                locale: 'pt-PT'
            },
            {
                name: 'Romania',
                locale: 'ro'
            },
            {
                name: 'Russian',
                locale: 'ru'
            },
            {
                name: 'Simplified Chinese',
                locale: 'zh-CN'
            },
            {
                name: 'Slovak',
                locale: 'sk'
            },
            {
                name: 'Spanish',
                locale: 'es'
            },
            {
                name: 'Swedish',
                locale: 'sv'
            },
            {
                name: 'Thai',
                locale: 'th'
            },
            {
                name: 'Traditional Chinese',
                locale: 'zh-TW'
            },
            {
                name: 'Turkish',
                locale: 'tr'
            }
        ],

        /**
        * @description Set the given Locale (E.g. 'es-ES') in the OJET Config Object and updates the 'lang' and 'dir' attributes of the HTML
        *
        * @since      6.1.0
        * @access     public
        * 
        * @author Daniel Merchan Garcia
        *
        * @param {string}   newLocale   Contains the full name of the language (e.g.: 'es-ES')
        * @return void
        * @example
        * Languages.setLocale('en-GB');
        * 
        */
        setLocale: (newLocale) => {
            oj.Config.setLocale(newLocale, () => {
                $('html').attr('lang', newLocale);
                if (newLocale.startsWith('ar')) {
                    $('html').attr('dir', 'rtl');
                } else {
                    $('html').attr('dir', 'ltr');
                }
            });
        },

        /**
        * @description Returns a an Object structure containing the Locale information by querying using the Full Language Name
        *
        * @since      6.1.0
        * @access     public
        * 
        * @author Daniel Merchan Garcia
        *
        * @param {string}   langName   Contains the full name of the language (e.g.: 'Spanish')
        * @return {Object} 
        * {
        *   name: 'Spanish'
        *   locale: 'es'
        * }
        * @example
        * Languages.getLocaleByLangName('Spanish');
        */
        getLocaleByLangName: (langName) => {
            return Languages.supportedLanguages.find(lang => {
                 return (lang.name === langName);
            });
        },

        /**
        * @description Returns a an Object structure containing the Locale information by querying using the Locale
        *
        * @since      6.1.0
        * @access     public
        * 
        * @author Daniel Merchan Garcia
        *
        * @param {string}   locale   Contains the locale language (e.g.: 'es')
        * @return {Object} 
        * {
        *   name: 'Spanish'
        *   locale: 'es'
        * }
        * @example
        * Languages.getLocaleByLocaleISO('es');
        */
        getLocaleByLocaleISO: (locale) => {
            return Languages.supportedLanguages.find(lang => {
                return (lang.locale === locale);
            });
        },

        getCurrentLocale: () => {
            return oj.Config.getLocale();
        }

    }
    return Languages;
});
