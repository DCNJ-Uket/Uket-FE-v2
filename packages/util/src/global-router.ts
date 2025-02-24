/* eslint-disable no-console */
let globalRouter: ReturnType<typeof import("next/navigation").useRouter>;

const setGlobalRouter = (router: typeof globalRouter) => {
  globalRouter = router;
};

const routerTo = (path: string, state?: string) => {
  const url = state ? `${path}?state=${state}` : path;

  if (globalRouter) {
    globalRouter.replace(url);
  } else {
    console.log("routerTo Function was called before router was initialized");
  }
};

export { routerTo, setGlobalRouter };
