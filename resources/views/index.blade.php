<!doctype html><html lang=""><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body {
      overflow-y: hidden;
    }

    #loading {
      font-family: sans-serif;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 40px;
      letter-spacing: -0.05em;
      font-weight: 500;
      color: #FF7600;
      background-color: #242424;
      transition: opacity 0.3s linear;
    }

    .dots {
      animation: blink 2s linear infinite;
    }

    .dots:nth-child(1) {
      animation-delay: 0s;
    }

    .dots:nth-child(2) {
      animation-delay: 0.5s;
    }

    .dots:nth-child(3) {
      animation-delay: 1s;
    }

    @keyframes blink {

      0% {
        opacity: 0;
      }

      50% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }</style><title></title><script defer="defer" src="/js/chunk-vendors.8ef48ce9.js"></script><script defer="defer" src="/js/app.8b03e5c7.js"></script><link href="/css/app.0ff173d9.css" rel="stylesheet"></head><body><div id="app"></div><div id="loading"><span class="dots">.</span><span class="dots">.</span><span class="dots">.</span></div></body></html>