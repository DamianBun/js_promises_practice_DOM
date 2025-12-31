'use strict';

let leftClick = false;
let rightClick = false;

// 🎯 PROMISE 1: LEFT CLICK lub REJECT po 3s
// eslint-disable-next-line no-unused-vars
const firstPromise = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  logo.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 && !leftClick) {
        // LEFT CLICK ONLY
        leftClick = true;
        resolve('First promise was resolved');
      }
    },
    {
      once: true,
    },
  );

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
})
  .then((message) => {
    document.body.innerHTML += `<div class="message success" data-qa="notification">${message}</div>`;
  })
  .catch((error) => {
    document.body.innerHTML += `<div class="message error" data-qa="notification">${error.message}</div>`;
  }); // eslint-disable-line no-unused-vars

// 🎯 PROMISE 2: LEFT LUB RIGHT CLICK (nigdy nie reject)
// eslint-disable-next-line no-unused-vars
const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick || rightClick) {
        resolve('Second promise was resolved');
      }
    },
    {
      once: true,
    },
  );
}).then((message) => {
  document.body.innerHTML += `<div class="message success" data-qa="notification">${message}</div>`;
}); // eslint-disable-line no-unused-vars

// 🎯 PROMISE 3: OBA kliknięcia (left + right)
// eslint-disable-next-line no-unused-vars
const thirdPromise = Promise.all([
  new Promise((resolve) => {
    if (leftClick) {
      resolve();
    } else {
      document.addEventListener(
        'click',
        (e) => {
          if (e.button === 0) {
            leftClick = true;
            resolve();
          }
        },
        {
          once: true,
        },
      );
    }
  }),
  new Promise((resolve) => {
    if (rightClick) {
      resolve();
    } else {
      document.addEventListener(
        'contextmenu',
        (e) => {
          e.preventDefault();
          rightClick = true;
          resolve();
        },
        {
          once: true,
        },
      );
    }
  }),
]).then(() => {
  document.body.innerHTML += `<div class="message success" data-qa="notification">Third promise was resolved</div>`;
}); // eslint-disable-line no-unused-vars
