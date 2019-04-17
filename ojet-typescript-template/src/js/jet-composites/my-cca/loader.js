define(["require", "exports", "ojs/ojcomposite", "text!./my-cca-view.html", "./my-cca-viewModel", "text!./component.json", "css!./my-cca-styles"], function (require, exports, Composite, view, viewModel, metadata) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () {
        var metadataObj = JSON.parse(metadata);
        Composite.register('my-cca', {
            view: view,
            viewModel: viewModel,
            metadata: metadataObj
        });
    })();
});
//# sourceMappingURL=loader.js.map