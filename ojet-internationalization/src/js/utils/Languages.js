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
                locale: 'ar-SA',
                icon: '/css/images/flags/ar-SA.png'
            },
            {
                name: 'Brazilian Portuguese',
                locale: 'pt-BR',
                icon: '/css/images/flags/pt-BR.png'
            },
            {
                name: 'Canadian French',
                locale: 'fr-CA',
                icon: '/css/images/flags/fr-CA.png'
            },
            {
                name: 'Czech',
                locale: 'cs',
                icon: '/css/images/flags/cs.png'
            },
            {
                name: 'Danish',
                locale: 'da',
                icon: '/css/images/flags/da.png'
            },
            {
                name: 'Dutch',
                locale: 'nl',
                icon: '/css/images/flags/nl.png'
            },
            {
                name: 'English',
                locale: 'en',
                icon: '/css/images/flags/en-GB.png'
            },
            {
                name: 'English USA',
                locale: 'en-US',
                icon: '/css/images/flags/en-US.png'
            },
            {
                name: 'Finnish',
                locale: 'fi',
                icon: '/css/images/flags/fi.png'
            },
            {
                name: 'French',
                locale: 'fr',
                icon: '/css/images/flags/fr.png'
            },
            {
                name: 'German',
                locale: 'de',
                icon: '/css/images/flags/de.png'
            },
            {
                name: 'Greek',
                locale: 'el',
                icon: '/css/images/flags/el.png'
            },
            {
                name: 'Hebrew',
                locale: 'he',
                icon: '/css/images/flags/he.png'
            },
            {
                name: 'Hungarian',
                locale: 'hu',
                icon: '/css/images/flags/hu.png'
            },
            {
                name: 'Italian',
                locale: 'it',
                icon: '/css/images/flags/it.png'
            },
            {
                name: 'Japanese',
                locale: 'jp',
                icon: '/css/images/flags/jp.png'
            },
            {
                name: 'Korean',
                locale: 'ko',
                icon: '/css/images/flags/ko.png'
            },
            {
                name: 'Norwegian',
                locale: 'no',
                icon: '/css/images/flags/no.png'
            },
            {
                name: 'Polish',
                locale: 'pl',
                icon: '/css/images/flags/pl.png'
            },
            {
                name: 'Portuguese',
                locale: 'pt-PT',
                icon: '/css/images/flags/pt-PT.png'
            },
            {
                name: 'Romania',
                locale: 'ro',
                icon: '/css/images/flags/ro.png'
            },
            {
                name: 'Russian',
                locale: 'ru',
                icon: '/css/images/flags/ru.png'
            },
            {
                name: 'Simplified Chinese',
                locale: 'zh-CN',
                icon: '/css/images/flags/zh-CN.png'
            },
            {
                name: 'Slovak',
                locale: 'sk',
                icon: '/css/images/flags/sk.png'
            },
            {
                name: 'Spanish',
                locale: 'es',
                icon: '/css/images/flags/es.png'
            },
            {
                name: 'Swedish',
                locale: 'sv',
                icon: '/css/images/flags/sv.png'
            },
            {
                name: 'Thai',
                locale: 'th',
                icon: '/css/images/flags/th.png'
            },
            {
                name: 'Traditional Chinese',
                locale: 'zh-TW',
                icon: '/css/images/flags/zh-TW.png'
            },
            {
                name: 'Turkish',
                locale: 'tr',
                icon: '/css/images/flags/tr.png'
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
        * @event {localeChangedEvent} To inform other modules to refresh their translations
        *
        * @param {string}   newLocale   Contains the full name of the language (e.g.: 'es-ES')
        * @return void
        * @example
        * Languages.setLocale('en-GB');
        * 
        */
        setLocale: (newLocale, langCallback) => {
            console.log(`Old locale: ${Languages.getCurrentLocale()} and New Locale: ${newLocale}`);
            oj.Config.setLocale(newLocale, () => {
                $('html').attr('lang', newLocale);
                if (newLocale.startsWith('ar')) {
                    $('html').attr('dir', 'rtl');
                } else {
                    $('html').attr('dir', 'ltr');
                }
                langCallback();
                // Dispatch a JS Event to allow other modules to subscribe and change translations accordingly.
                document.dispatchEvent(new CustomEvent('localeChangedEvent'));
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

        /**
        * @description Wrapper of the oj.Config.getLocale() of Oracle JET API
        *
        * @since      6.1.0
        * @access     public
        * 
        * @author Daniel Merchan Garcia
        *
        * @return {Object} 
        * 
        * @example
        * Languages.getLocale();
        */
        getCurrentLocale: () => {
            return oj.Config.getLocale();
        }

    }
    return Languages;
});
