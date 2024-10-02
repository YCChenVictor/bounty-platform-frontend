import * as TaskHandlerModule from "../src/TaskHandler";
import * as TaskContractModule from "../src/TaskContract";
import * as TaskBackendModule from "../src/TaskBackend";
import { handleListTasks } from "../src/Task";

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

describe("handleCreateTask", () => {
  const newTaskName = "Test Task";
  const newTaskOwner = "Test Owner";
  const newTaskRepo = "Test Repo";
  const newPaymentAmountRepo = 100;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a task and fetch tasks when successful", async () => {
    const backendId = "123";

    jest.spyOn(TaskHandlerModule, "handleCreateTask");
    jest.spyOn(TaskHandlerModule, "fetchTasksFromBackend");
    jest.spyOn(TaskContractModule, "createTaskInBlockchain");
    jest
      .spyOn(TaskBackendModule, "createTaskInBackend")
      .mockResolvedValue(backendId);

    await TaskHandlerModule.handleCreateTask(
      newTaskName,
      newTaskOwner,
      newTaskRepo,
      newPaymentAmountRepo,
      jest.fn(),
      [],
    );

    expect(TaskContractModule.createTaskInBlockchain).toHaveBeenCalledWith(
      backendId,
      newPaymentAmountRepo,
    );
    expect(TaskBackendModule.createTaskInBackend).toHaveBeenCalled();
  });

  // it("should log an error when creating a task fails", async () => {
  //   const error = new Error("Test Error");
  //   createTaskInBackend = jest.fn().mockRejectedValue(error);

  //   console.error = jest.fn();

  //   await handleCreateTask();

  //   expect(console.error).toHaveBeenCalledWith("Error creating task:", error);
  // });
});
