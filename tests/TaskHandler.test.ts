import * as TaskHandlerModule from "../src/TaskHandler";
import * as TaskContractModule from "../src/TaskContract";
import { handleListTasks } from "../src/App";

describe("handleListTasks", () => {
  const setTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch tasks from backend and blockchain and map them correctly", async () => {
    // Set up test data
    const backendTasks = [
      { id: 1, name: "Task 1", completed: true },
      { id: 2, name: "Task 2", completed: false },
    ];
    const blockchainTasks = [
      [1, true],
      [2, false],
    ];

    jest
      .spyOn(TaskHandlerModule, "fetchTasksFromBackend")
      .mockResolvedValue(backendTasks);
    jest
      .spyOn(TaskContractModule, "getTasks")
      .mockResolvedValue(blockchainTasks);

    await handleListTasks(setTasks);

    expect(setTasks).toHaveBeenCalledWith([
      {
        backendId: 1,
        blockchainId: 1,
        name: "Task 1",
        backendCompleted: true,
        blockchainCompleted: true,
      },
      {
        backendId: 2,
        blockchainId: 2,
        name: "Task 2",
        backendCompleted: false,
        blockchainCompleted: false,
      },
    ]);
  });
});
