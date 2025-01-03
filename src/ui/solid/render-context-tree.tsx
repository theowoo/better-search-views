import { render } from "solid-js/web";
import { PluginContextProvider } from "./plugin-context";
import { Tree } from "./tree";
import { ContextTree } from "../../types";
import BetterBacklinksPlugin from "../../plugin";

interface RenderContextTreeProps {
  contextTree: ContextTree;
  highlights: string[];
  el: HTMLElement;
  plugin: BetterBacklinksPlugin;
  infinityScroll: any;
}

export function renderContextTree({
  contextTree,
  el,
  plugin,
  highlights,
  infinityScroll
}: RenderContextTreeProps) {

  // Extract alias from aliased links ([[Note title|Alias]]) to be highlighted
  highlights = highlights.map((hl) => hl.split('|').slice(-1)[0]);

  // Extract note title from heading and block links
  highlights = highlights.map((hl) => hl.split('#')[0]);

  return render(
    () => (
      <PluginContextProvider plugin={plugin} infinityScroll={infinityScroll}>
        <Tree fileContextTree={contextTree} highlights={highlights} />
      </PluginContextProvider>
    ),
    el
  );
}
