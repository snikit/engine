import { WindowRefService } from './services/window-ref.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EngineComponent } from './engine/engine.component';
import { UiInfobarBottomComponent } from './ui/ui-infobar-bottom/ui-infobar-bottom.component';
import { UiInfobarTopComponent } from './ui/ui-infobar-top/ui-infobar-top.component';
import { UiSidebarLeftComponent } from './ui/ui-sidebar-left/ui-sidebar-left.component';
import { UiSidebarRightComponent } from './ui/ui-sidebar-right/ui-sidebar-right.component';
import { UiComponent } from './ui/ui.component';
import { HomeComponent } from './home/home.component';
import { AppRouterModule } from './app.router';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiSidebarLeftComponent,
    UiSidebarRightComponent,
    UiInfobarTopComponent,
    UiComponent,
    UiInfobarBottomComponent,
    HomeComponent,
    EditorComponent,
    ViewerComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRouterModule],
  providers: [WindowRefService],
  bootstrap: [AppComponent],
})
export class AppModule {}
