// import styles
import "./styles.css";
import "./custom-tool/custom-video.css";
// import editorjs class
import EditorJs from "@editorjs/editorjs";
// import required tools
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import Embed from "@editorjs/embed";
import RawTool from "@editorjs/raw";
import Checklist from "@editorjs/checklist";
import ChangeCase from "editorjs-change-case";
import Underline from "@editorjs/underline";
import AttachesTool from "@editorjs/attaches";
import Tooltip from "editorjs-tooltip";
import DragDrop from "editorjs-drag-drop";
// custom video tool
import CustomVideo from "./custom-tool/CustomVideo";

const editor = new EditorJs({
  holder: "editorjs",
  // set up the tools
  tools: {
    video: CustomVideo,
    // create ordered or unordered list (nested also)
    list: {
      class: NestedList,
      inlineToolbar: true,
    },
    // create to add any codes
    code: CodeTool,
    // Add link
    linkTool: {
      class: LinkTool,
    },
    // Add any image
    image: {
      class: ImageTool,
      config: {},
    },
    // Video

    // Inline marker by user select / or enter ctrl+shift+m
    Marker: {
      class: Marker,
      shortcut: "CTRL+SHIFT+M",
    },
    // Embeding from youtube and coub
    embed: {
      class: Embed,
      inlineToolbar: false,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
    // To add raw html code
    raw: {
      class: RawTool,
    },
    // Add Header h1 to h6. Default is h1 / shortcut is ctrl+h
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Header",
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
      shortcut: "CTRL+H",
    },
    // Add any quote with caption
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: "CTRl+SHIFT+O",
      config: {
        quotePlaceholder: "Enter a quote",
      },
    },
    // Checkbox
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    // Change case in anyformat on the selected text
    changeCase: {
      class: ChangeCase,
      config: {
        showLocaleOption: true,
        locale: "tr",
      },
    },
    // Add underline on selected text
    underline: Underline,
    // Attach any type of document
    attaches: {
      class: AttachesTool,
      config: {},
    },
    // Add tooltip and show on the top
    tooltip: {
      class: Tooltip,
      config: {
        location: "top",
        highlightColor: "#FFEFD5",
        underline: true,
        backgroundColor: "#154360",
        textColor: "#FDFEFE",
      },
    },
  },

  data: {},

  autofocus: true,

  // Call the function when editor is ready
  onReady: () => {
    console.log("Editorjs is ready to work");
    new DragDrop(editor);
  },
});

const run = async () => {
  try {
    await editor.isReady;
    console.log("Editor is rendered successfully");
  } catch (e) {
    console.log(e);
  }
};

run();
