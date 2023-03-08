import {Component, OnInit} from '@angular/core';
import {filter, map, switchMap, tap} from "rxjs";

import {MatSnackBar} from "@angular/material/snack-bar";
import {SwUpdate} from "@angular/service-worker";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {}

  ngOnInit() {
    /* this.updates.available.pipe(
      switchMap(() => this.snackbar.open('A new version is available!', 'Update now').afterDismissed()),
      tap(p => console.log("first")),
      filter(result => result.dismissedByAction),
      tap(p => console.log("second")),
      map(() => this.updates.activateUpdate().then(() => {console.log("updated");location.reload()}))).subscribe();
  } */
  this.updates.versionUpdates.pipe(
    tap(p => console.log("updates pipe 1"))
    ).subscribe(evt => {
      console.log(evt);
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.snackbarStuff();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
}

 snackbarStuff(){
  console.log('snackbarStuff1');
  let sbref = this.snackbar.open('A new version is available!', 'Update now');
  console.log('snackbarStuff2');
  sbref.afterDismissed().subscribe(() => {
    console.log('The snackbar was dismissed');
    location.reload();
  });
 }
 public openSnackBar(){
  let sbref = this.snackbar.open('Test snackbar!', 'Action to close?');
  sbref.afterDismissed().subscribe(() => {
    console.log('The test snackbar was dismissed');
  });
 }
}
