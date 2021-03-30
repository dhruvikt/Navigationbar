var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import styles from './AppCustomizer.module.scss';
import * as strings from 'NavigationBarApplicationCustomizerStrings';
import { NavigationBar } from './NavigationBar';
var LOG_SOURCE = 'NavigationBarApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var NavigationBarApplicationCustomizer = /** @class */ (function (_super) {
    __extends(NavigationBarApplicationCustomizer, _super);
    function NavigationBarApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationBarApplicationCustomizer.prototype.onInit = function () {
        Log.info(LOG_SOURCE, "Initialized " + strings.Title);
        // Wait for the placeholders to be created (or handle them being changed) and then
        // render.
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    };
    NavigationBarApplicationCustomizer.prototype._renderPlaceHolders = function () {
        console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
        console.log("Available placeholders: ", this.context.placeholderProvider.placeholderNames
            .map(function (name) { return PlaceholderName[name]; })
            .join(", "));
        // Handling the top placeholder
        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!this._topPlaceholder) {
                console.error("The expected placeholder (Top) was not found.");
                return;
            }
            if (this.properties) {
                var topString = this.properties.Top;
                if (!topString) {
                    topString = "(Top property was not defined.)";
                }
                if (this._topPlaceholder.domElement) {
                    this._topPlaceholder.domElement.innerHTML = "\n          <div class=\"" + styles.app + "\">\n            <div class=\"" + styles.top + "\">\n              <div id=\"Header\" style='width:100%'>\n              </div>\n            </div>\n          </div>";
                }
                var navBar = new NavigationBar({});
                navBar.callRender();
            }
        }
        // Handling the bottom placeholder
        // if (!this._bottomPlaceholder) {
        //   this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        //     PlaceholderName.Bottom,
        //     { onDispose: this._onDispose }
        //   );
        //   // The extension should not assume that the expected placeholder is available.
        //   if (!this._bottomPlaceholder) {
        //     console.error("The expected placeholder (Bottom) was not found.");
        //     return;
        //   }
        //   if (this.properties) {
        //     let bottomString: string = this.properties.Bottom;
        //     if (!bottomString) {
        //       bottomString = "(Bottom property was not defined.)";
        //     }
        //     if (this._bottomPlaceholder.domElement) {
        //       this._bottomPlaceholder.domElement.innerHTML = `
        //       <div class="${styles.app}">
        //         <div class="${styles.bottom}">
        //         </div>
        //       </div>`;
        //     }
        //   }
        // }
    };
    NavigationBarApplicationCustomizer.prototype._onDispose = function () {
        console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
    };
    __decorate([
        override
    ], NavigationBarApplicationCustomizer.prototype, "onInit", null);
    return NavigationBarApplicationCustomizer;
}(BaseApplicationCustomizer));
export default NavigationBarApplicationCustomizer;
//# sourceMappingURL=NavigationBarApplicationCustomizer.js.map