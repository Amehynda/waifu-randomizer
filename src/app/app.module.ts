import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WaifuInitComponent } from './waifu-init/waifu-init.component';
import { WaifuOutputComponent } from './waifu-output/waifu-output.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WaifuInitComponent
  },
  {
    path: 'result',
    component: WaifuOutputComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WaifuInitComponent,
    WaifuOutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload'}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
