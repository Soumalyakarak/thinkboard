import { useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCanvasSocket from "../../hooks/useCanvasSocket";
import Toolbar from "../Toolbar";
import Board from "../Board";
import Toolbox from "../Toolbox";

import BoardProvider from "../../store/BoardProvider";
import ToolboxProvider from "../../store/ToolboxProvider";
import boardContext from "../../store/board-context";

import { BOARD_ACTIONS , TOOL_ACTION_TYPES } from "../../constants";
import { updateCanvas } from "../../utils/canvas";


const CanvasPageContent = ({ canvasId }) => {
  const navigate = useNavigate();
  const { elements,toolActionType, dispatchBoardAction } = useContext(boardContext);

  const saveTimeout = useRef(null);
  const hasLoaded = useRef(false); // 🔥 prevents autosave on initial load

  // 1️⃣ LOAD canvas (GET)
  useEffect(() => {
    const loadCanvas = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/canvas/${canvasId}`,
          { credentials: "include" }
        );

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          if (res.status === 401) {
            navigate("/login");
            return;
          }
          if (res.status === 403) {
            alert("You do not have access to this canvas");
            navigate("/");
            return;
          }
          throw new Error(data.message || "Failed to load canvas");
        }

        dispatchBoardAction({
          type: BOARD_ACTIONS.INIT_ELEMENTS,
          payload: {
            elements: data.canvas.elements || [],
          },
        });

        hasLoaded.current = true; // ✅ mark load complete
      } catch (err) {
        console.error(err);
      }
    };

    loadCanvas();
  }, [canvasId, dispatchBoardAction, navigate]);

  // 2️⃣ AUTOSAVE canvas (PUT)
  useEffect(() => {
    if (!hasLoaded.current) return; // ❗ don't save immediately after load
    if (!elements) return;
    if (toolActionType === TOOL_ACTION_TYPES.NONE) return;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    console.log("Autosave elements:", elements);
    

    saveTimeout.current = setTimeout(async () => {
      try {
        await updateCanvas(canvasId, elements);
        console.log("Canvas autosaved");
      } catch (err) {
        console.error("Autosave failed", err);
        if (err.status === 401) navigate("/login");
      }
    }, 800);
  }, [elements, canvasId, navigate,toolActionType]);

   // 🔥 SOCKET LOGIC (one line)
  useCanvasSocket({
    canvasId,
    dispatchBoardAction,
    elements,
    hasLoaded,
    toolActionType
  });

  return (
    <>
      <Toolbar />
      <Board />
      <Toolbox />
    </>
  );
};



const CanvasPage = () => {
  const { canvasId } = useParams();

  return (
    <BoardProvider>
      <ToolboxProvider>
        <CanvasPageContent canvasId={canvasId} />
      </ToolboxProvider>
    </BoardProvider>
  );
};

export default CanvasPage;
