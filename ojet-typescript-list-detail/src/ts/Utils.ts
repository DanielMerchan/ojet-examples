import {ojModule} from "ojs/ojmodule-element";
import ModuleElementUtils = require("ojs/ojmodule-element-utils");

class Utils {

    private constructor() {
    }

    public static resolveViewAndViewModel = (name: string, moduleConfig: KnockoutObservable<ojModule['config']>, cleanUpMode?: "onDisconnect"|"none", params?: any) =>{
        let viewPath = 'views/'+ name+ '.html';
        let viewmodelPath = 'viewModels/'+name;
        console.log(viewPath + ' ' + viewmodelPath);
        let viewPromises = Promise.all([
            ModuleElementUtils.createView({viewPath: viewPath}),
            ModuleElementUtils.createViewModel({viewModelPath: viewmodelPath})
        ]);
        viewPromises.then(
            (values) => {
                const viewModel = new values[1](params);
                console.log(viewModel);
                moduleConfig({view: values[0], viewModel: viewModel, cleanupMode: cleanUpMode? cleanUpMode: "onDisconnect"});
            },
            (rejectReason) => {
                console.log(rejectReason);
            }
        )
    }
}

export = Utils;

