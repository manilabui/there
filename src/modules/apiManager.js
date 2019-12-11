const remoteURL = "http://localhost:5002";

export const getItem = (entity, id) => fetch(`${remoteURL}/${entity}/${id}`).then(result => result.json());

export const getAll = entity => fetch(`${remoteURL}/${entity}`).then(result => result.json());

export const deleteItem = (entity, id) => {
  return fetch(`http://localhost:5002/${entity}/${id}`, {
      method: "DELETE"
  })
  	.then(result => result.json());
};

export const postItem = (entity, item) => {
    return fetch(`${remoteURL}/${entity}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
    	.then(data => data.json());
};

export const updateItem = (entity, item) => {
    return fetch(`${remoteURL}/${entity}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }).then(data => data.json());
  };