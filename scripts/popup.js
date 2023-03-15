/**
 * DOM
 */
const loadList = async (site) => {
  const result = await chrome.storage.local.get([site]);
  const muteUsers = result[site];
  if (muteUsers) {
    muteUsers.forEach((muteUser) => {
      createList(site, muteUser);
    });
  }
};

const createList = (site, inputText) => {
  const div = document.createElement("div");
  div.className = "list-row";

  const li = document.createElement("li");
  li.innerText = inputText;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () =>
    onClickDelete(site, deleteButton, inputText)
  );

  div.appendChild(li);
  div.appendChild(deleteButton);

  document.querySelector(`#mute-list-${site}`).appendChild(div);
};

const deleteList = (site, deleteButton) => {
  const deleteTarget = deleteButton.parentNode;
  document.querySelector(`#mute-list-${site}`).removeChild(deleteTarget);
};

/**
 * Storage
 */
const addMuteUserToStorage = async (site, inputText) => {
  const result = await chrome.storage.local.get([site]);
  const muteUsers = result[site] ? [...result[site], inputText] : [inputText];
  chrome.storage.local.set({ [site]: muteUsers });
};

const deleteMuteUserFromStorage = async (site, inputText) => {
  const result = await chrome.storage.local.get([site]);
  const muteUsers = result[site]
    ? result[site].filter((user) => user !== inputText)
    : undefined;
  chrome.storage.local.set({ [site]: muteUsers });
};

/**
 * event handler
 */
const onLoad = async () => {
  await loadList("zenn");
  await loadList("qiita");
};

const onClickAdd = async (site) => {
  const inputText = document.querySelector(`#add-text-${site}`).value;
  document.querySelector(`#add-text-${site}`).value = "";

  createList(site, inputText);
  addMuteUserToStorage(site, inputText);
};

const onClickDelete = (site, deleteButton, inputText) => {
  deleteList(site, deleteButton);
  deleteMuteUserFromStorage(site, inputText);
};

/**
 * event
 */
window.onload = onLoad;

document
  .querySelector("#add-button-zenn")
  .addEventListener("click", () => onClickAdd("zenn"));

document
  .querySelector("#add-button-qiita")
  .addEventListener("click", () => onClickAdd("qiita"));
