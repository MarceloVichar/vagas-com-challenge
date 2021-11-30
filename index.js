const $ = (element) => document.querySelector(element);

let inputElement = $("#input-value");
let changeValueButton = $("#decrement");

let errorMessages = [];

document.getElementById("form-submit").addEventListener("click", (event) => {
  event.preventDefault();

  if (validate()) {
    $("#success-message").innerText = "Formulário enviado com sucesso!";
    $("#error-message").innerText = "";
  } else {
    $("#error-message").innerText = errorMessages.map(
      (message) => ` ${message}`
    );
    $("#success-message").innerText = "";
  }
});

changeButtonStatus();

inputElement.addEventListener("change", (element) => {
  handleChangeInputValue(element);
});

let inputValue = inputElement.value;

function incrementValue() {
  inputValue++;
  updateInputValue();
  changeButtonStatus(inputValue);
}

function decrementValue() {
  if (inputValue > 0) inputValue--;
  updateInputValue();
  changeButtonStatus(inputValue);
}

const updateInputValue = () => (inputElement.value = inputValue);

const handleChangeInputValue = ({ target }) => {
  const { value } = target;
  inputValue = value;
  changeButtonStatus(inputValue);
};

function changeButtonStatus(value) {
  if (!value) {
    changeValueButton.setAttribute("disabled", true);
  } else {
    changeValueButton.removeAttribute("disabled");
  }
}

function validate() {
  errorMessages = [];
  const stickerQuantityIsValid = inputValue > 0;

  const hasSomeoneStickerSelected = document.querySelector(
    ".ckeckbox-sticker:checked"
  );

  const areThereAnyComments =
    document.querySelector(".descricao").value.length > 0;
  console.log(areThereAnyComments);

  if (!stickerQuantityIsValid) {
    inputElement.classList.add("input-error-value");
    errorMessages.push("É necessário inserir um número maior que 0");
  } else {
    inputElement.classList.remove("input-error-value");
  }

  !hasSomeoneStickerSelected &&
    errorMessages.push("É necessário selecionar algum sticker");

  !areThereAnyComments &&
    errorMessages.push("É necessário fazer alguma observação");

  return (
    stickerQuantityIsValid && hasSomeoneStickerSelected && areThereAnyComments
  );
}
