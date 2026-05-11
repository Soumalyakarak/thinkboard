import { useEffect, useRef } from "react";
import { socket } from "../socket/socket";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES } from "../constants";

const useCanvasSocket = ({
  canvasId,
  dispatchBoardAction,
  elements,
  hasLoaded,
  toolActionType,
}) => {
  const isRemoteUpdate = useRef(false);

  /* ---------- CONNECT ONCE ---------- */
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  /* ---------- JOIN / LEAVE CANVAS ROOM ---------- */
  useEffect(() => {
    if (!canvasId) return;

    socket.emit("join-canvas", { canvasId });

    return () => {
      socket.emit("leave-canvas", { canvasId });
    };
  }, [canvasId]);

  /* ---------- INITIAL CANVAS LOAD ---------- */
  useEffect(() => {
    socket.on("canvas:init", (elements) => {
      isRemoteUpdate.current = true;

      dispatchBoardAction({
        type: BOARD_ACTIONS.INIT_ELEMENTS,
        payload: { elements },
      });
    });

    return () => {
      socket.off("canvas:init");
    };
  }, [dispatchBoardAction]);

  /* ---------- RECEIVE REMOTE UPDATES ---------- */
  useEffect(() => {
    socket.on("canvas-update", (remoteElements) => {
      isRemoteUpdate.current = true;

      dispatchBoardAction({
        type: BOARD_ACTIONS.INIT_ELEMENTS,
        payload: { elements: remoteElements },
      });
    });

    return () => {
      socket.off("canvas-update");
    };
  }, [dispatchBoardAction]);

  /* ---------- BROADCAST LOCAL CHANGES (SAFE) ---------- */
  useEffect(() => {
    if (!hasLoaded.current) return;
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    // 🚫 Don't broadcast during drawing / erasing
    if (toolActionType !== TOOL_ACTION_TYPES.NONE) return;

    socket.emit("canvas-update", {
      canvasId,
      elements,
    });
  }, [elements, canvasId, hasLoaded, toolActionType]);
};

export default useCanvasSocket;
