import { skeletonPwa } from "skeletonPwa";
import * as singleSpa from 'single-spa';
import singleSpaReact from 'single-spa-react';

skeletonPwa.service('singleSpa', function () {
      return singleSpa;
    })
    .service('singleSpaReact', function () {
      return singleSpaReact;
    });

module.exports = ['singleSpa', 'singleSpaReact'];