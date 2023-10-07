# About the challenge
Create an API to manage your tasks without using a framework.

## Functionalities
- [ ] Create a task
- [ ] List all tasks
- [ ] Update a task using its `id`
- [ ] Remove a task using its `id`
- [ ] Import multiple tasks via a `csv` file

## Task structure
| Field | Description |
| --- | ----------- |
| `id` | Unique identifier for each task. |
| `title` | Task title. |
| `description` | Dtailed description of a task. |
| `completed_at` | Date of task completion. The initial value must be **null**. |
| `created_at` | Date of task creation. |
| `updated_at` | Date when task is updated. It must be always have the new date for any updates. |

## Routes & Business Logic

<details>
  <summary><b>Create Tasks<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `POST` | `/tasks` |

  #### Description
  Create a new task in the database, sending the fields `title` and `description` via the request body. 

  After creating a task, the fields `id`, `created_at`, `updated_at`, and `completed_at` will be filled automatically
  <hr>
</details>

<details>
  <summary><b>List All Tasks<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `GET` | `/tasks` |

  #### Description
  List all tasks stored in the database. It can also permorm a search, filtering tasks by `title` and `description`
  <hr>
</details>

<details>
  <summary><b>Update a task<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `PUT` | `/tasks/:id` |

  #### Description
  Update a task using its `id`. In the request `body`, you will receive `title` and/or `description` to be updated.

  If only `title` was received, `description` must not change and vice-versa.

  Before an update, a validation happens to check if the given `id` matches a task stored in the database.
  <hr>
</details>

<details>
  <summary><b>Remove a task<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `DELETE` | `/tasks/:id` |

  #### Description
  Remove a task by using its `id`.

  Before an update, a validation happens to check if the given `id` matches a task stored in the database.
</details>

<details>
  <summary><b>Toggle a task as completed/incompleted<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `PATCH` | `/tasks/:id/complete` |

  #### Description
  It toggles a task as completed or incompleted. The incompleted is the "normal" state of a task.

  Before an update, a validation happens to check if the given `id` matches a task stored in the database.
  <hr>
</details>


<details>
  <summary><b>CSV Import<b></summary>
  
  #### Route
  | HTTP Method | Route |
  | --- | --- |
  | `POST` | `/tasks` |

  #### Description
  https://efficient-sloth-d85.notion.site/Cria-o-via-CSV-com-Stream-21ba6d279991473792787d9265212181
  <hr>
</details>