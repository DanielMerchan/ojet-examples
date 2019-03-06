module.exports = {

    /*
     * Build a WAR (web archive) without Maven or the JVM installed.
     *
     * Template strings in the <%= %> tags are set in the data section of Gruntfile.js,
     *  or you can hardcode the strings here instead
     */

    target: {
        options: {
            war_dist_folder: '<%= distdir %>',      /* Folder to generate the WAR into, set in data section of Gruntfile.js */
            war_name: '<%= appname %>',            /* The name for the WAR file (.war will be the extension) */
            webxml_webapp_version: '2.5', /* I needed this older version for JCS-SX */
            webxml_display_name: '<%= appname %>',
            war_extras: [{ filename: 'grunt-war-credits.txt', data: 'This line will appear in the file!\n see http://likeahouseafire.com/2017/08/09/updated-using-grunt-to-create-war-jet3x/ ' },
            { filename: 'WEB-INF/weblogic.xml', data: '<?xml version="1.0" encoding="UTF-8"?>\n<weblogic-web-app xmlns="http://www.bea.com/ns/weblogic/90" xmlns:j2ee="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.bea.com/ns/weblogic/90 http://www.bea.com/ns/weblogic/90/weblogic-web-app.xsd">\n  <jsp-descriptor>\n    <keepgenerated>true</keepgenerated>\n    <debug>true</debug>\n  </jsp-descriptor>\n  <context-root>/<%= appname %></context-root>\n</weblogic-web-app>' }],
            /* the war_extras are extra files to be generated, needed since grunt-war doesn't create a weblogic.xml */                                          /* also notice that we're using the <%= appname %> variable in there */
            webxml_welcome: 'index.html', /* to point web.xml to the default page */
            webxml_webapp_extras: ['<login-config />\n', '<session-config>\n    <session-timeout>\n    30\n    </session-timeout>\n</session-config>\n']
            /* some extra settings for weijetb.xml to work with JCS-SX */

        },
        files: [
            {
                expand: true,
                cwd: '<%= appdir %>',             /* find the source files for the WAR in the /web folder, set in Gruntfile.js */
                src: ['**'],
                dest: ''
            }
        ]
    }
};