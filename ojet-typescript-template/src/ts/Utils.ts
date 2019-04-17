import {ojModule} from "ojs/ojmodule-element";
import ModuleElementUtils = require("ojs/ojmodule-element-utils");

class Utils {

    private constructor() {
    }

    public static resolveViewAndViewModel = (name: string, moduleConfig: KnockoutObservable<ojModule['config']>, cleanUpMode?: "onDisconnect"|"none") =>{
        let viewPath = 'views/'+ name+ '.html';
        let viewmodelPath = 'viewModels/'+name;
        let viewPromises = Promise.all([
            ModuleElementUtils.createView({viewPath: viewPath}),
            ModuleElementUtils.createViewModel({viewModelPath: viewmodelPath})
        ]);
        viewPromises.then(
            (values) => {
                moduleConfig({view: values[0], viewModel: values[1], cleanupMode: cleanUpMode? cleanUpMode: "onDisconnect"});
            },
            (rejectReason) => {
                console.log(rejectReason);
            }
        )
    }
}

export = Utils;

