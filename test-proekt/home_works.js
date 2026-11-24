[
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  }
]
function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}
function moveBlock(position = 0) {
    const smallBlock = document.querySelector(".small-block"); 
    
    if (!smallBlock) return; 

    
    position += 2;
    smallBlock.style.left = `${position}px`;

    
    if (position < 300) {
        
        setTimeout(() => {
            moveBlock(position);
        }, 20); 
    }
}







function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

if (gmailButton && gmailInput && gmailResult) {
    gmailButton.addEventListener('click', () => {
        const value = gmailInput.value.trim();

        if (validateEmail(value)) {
            gmailResult.textContent = 'Почта валидна';
            gmailResult.style.color = 'green';
        } else {
            gmailResult.textContent = 'Некорректный адрес Gmail';
            gmailResult.style.color = 'red';
        }
    });
}


function moveBlock(position = 0) {
    const smallBlock = document.querySelector('.small-block');
    const parentBlock = smallBlock ? smallBlock.parentElement : null;

    if (!smallBlock || !parentBlock) return;

    const maxPosition = parentBlock.clientWidth - smallBlock.clientWidth;

    if (position < maxPosition) {
        position += 2;
        if (position > maxPosition) {
            position = maxPosition;
        }
        smallBlock.style.left = `${position}px`;

        setTimeout(() => {
            moveBlock(position);
        }, 20);
    }
}

moveBlock();



function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail
                ? reject(new Error(`Ошибка при обработке: ${value}`))
                : resolve(value);
        }, ms);
    });
}




console.log('--- Задание 1: .then / .catch / .finally ---');

delay(1, 500, false)
    .then((val) => {
        console.log('Шаг 1 успешен, значение:', val);
        return delay(val + 1, 500, true); // второй шаг падает
    })
    .then((val) => {
        // Этот блок НЕ выполнится, так как предыдущий промис упал
        console.log('Шаг 2 успешен (не должен выполниться), значение:', val);
        return delay(val + 1, 500, false);
    })
    .then((val) => {
        console.log('Шаг 3 успешен (не должен выполниться), значение:', val);
    })
    .catch((error) => {
        console.warn('Перехвачено в .catch:', error.message);
    })
    .finally(() => {
        console.log('Блок .finally сработал в любом случае');
    });



async function runTaskTwo() {
    console.log('--- Задание 2: async/await и массив ---');

    // Часть A: цепочка из 3 шагов через async/await
    try {
        const v1 = await delay(1, 500, false);
        console.log('async шаг 1:', v1);

        const v2 = await delay(v1 + 1, 500, true); // упадёт
        console.log('async шаг 2 (не выполнится):', v2);

        const v3 = await delay(v2 + 1, 500, false);
        console.log('async шаг 3 (не выполнится):', v3);
    } catch (error) {
        console.warn('async/await поймал ошибку:', error.message);
    } finally {
        console.log('async/await блок finally выполнен');
    }

    
    const items = [10, 20, 30, 40];
    const results = [];

    for (const item of items) {
        const shouldFail = Math.random() > 0.7;
        try {
            const value = await delay(item, 300, shouldFail);
            results.push({ value, error: null });
        } catch (error) {
            results.push({ value: item, error: error.message });
        }
    }

    console.log('Итоговый массив [{ value, error }]:', results);
}

runTaskTwo();




async function runTaskThree() {
    console.log('--- Задание 3: Promise.all / allSettled / race ---');

    const createFourPromises = () => [
        delay('A', 300, false),
        delay('B', 600, true),  // один из промисов падает
        delay('C', 900, false),
        delay('D', 1200, false),
    ];


    try {
        const allRes = await Promise.all(createFourPromises());
        console.log('Promise.all успех:', allRes);
    } catch (error) {
        console.warn('Promise.all упал при первой ошибке:', error.message);
    }

    // 3.2 Promise.allSettled — разделяем на succeeded и failed
    const settledRes = await Promise.allSettled(createFourPromises());
    const succeeded = settledRes
        .filter((item) => item.status === 'fulfilled')
        .map((item) => item.value);
    const failed = settledRes
        .filter((item) => item.status === 'rejected')
        .map((item) => item.reason.message);

    console.log('Promise.allSettled succeeded:', succeeded);
    console.log('Promise.allSettled failed:', failed);


    try {
        const winner = await Promise.race([
            delay('Полезные данные', 2000, false),
            delay('Таймаут запроса', 500, true),
        ]);
        console.log('Promise.race выиграл:', winner);
    } catch (error) {
        console.warn('Promise.race проиграл/упал первым:', error.message);
    }
}

runTaskThree();



const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const form = document.querySelector('#userForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const ageInput = document.querySelector('#ageInput');
const genderSelect = document.querySelector('#genderSelect');
const agreementCheckbox = document.querySelector('#agreementCheckbox');
const sendJsonBtn = document.querySelector('#sendJsonBtn');
const sendFormDataBtn = document.querySelector('#sendFormDataBtn');
const statusMessage = document.querySelector('#statusMessage');
const responseOutput = document.querySelector('#responseOutput');

const setStatus = (text, color = '#111') => {
  if (statusMessage) {
    statusMessage.textContent = text;
    statusMessage.style.color = color;
  }
};

const setOutput = (data) => {
  if (!responseOutput) return;
  responseOutput.textContent =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);
};

// Проверка полей формы и чекбокса согласия
const validateFormData = (payload) => {
  if (!payload.agreement) {
    throw new Error('Подтвердите согласие на обработку данных (поставьте галочку).');
  }

  if (!payload.name || payload.name.trim().length < 2) {
    throw new Error('Введите корректное имя (минимум 2 символа).');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    throw new Error('Введите корректный email.');
  }

  if (!payload.password || payload.password.length < 6) {
    throw new Error('Пароль должен содержать минимум 6 символов.');
  }

  const numericAge = Number(payload.age);
  if (!Number.isFinite(numericAge) || numericAge <= 0 || numericAge > 120) {
    throw new Error('Введите корректный возраст (от 1 до 120).');
  }

  if (!payload.gender) {
    throw new Error('Выберите пол.');
  }
};

const collectFormValues = () => {
  if (!form) {
    throw new Error('Форма #userForm не найдена на странице.');
  }

  return {
    name: nameInput ? nameInput.value.trim() : '',
    email: emailInput ? emailInput.value.trim() : '',
    password: passwordInput ? passwordInput.value : '',
    age: ageInput ? ageInput.value.trim() : '',
    gender: genderSelect ? genderSelect.value : '',
    agreement: agreementCheckbox ? agreementCheckbox.checked : false,
  };
};

// Безопасный парсинг ответа сервера
const parseResponseBody = async (response) => {
  const rawText = await response.text();
  if (!rawText) return null;

  try {
    return JSON.parse(rawText);
  } catch {
    return rawText;
  }
};

// Вариант 1: отправка в формате application/json
const sendAsJson = async (data) => {
  const response = await fetch(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      age: Number(data.age),
      gender: data.gender,
      agreement: data.agreement,
    }),
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    const serverMessage =
      parsedBody && typeof parsedBody === 'object' && parsedBody.message
        ? parsedBody.message
        : `HTTP ошибка ${response.status} (${response.statusText})`;
    throw new Error(serverMessage);
  }

  return parsedBody;
};


const sendAsFormData = async (formElement, data) => {
  const formData = new FormData(formElement);
  // Явно синхронизируем значение чекбокса ('true' / 'false')
  formData.set('agreement', String(Boolean(data.agreement)));

  
  
  const response = await fetch(POST_URL, {
    method: 'POST',
    body: formData,
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    const serverMessage =
      parsedBody && typeof parsedBody === 'object' && parsedBody.message
        ? parsedBody.message
        : `HTTP ошибка ${response.status} (${response.statusText})`;
    throw new Error(serverMessage);
  }

  return {
    serverResponse: parsedBody,
    sentEntries: Object.fromEntries(formData.entries()),
  };
};

const toggleButtonsDisabled = (disabled) => {
  if (sendJsonBtn) sendJsonBtn.disabled = disabled;
  if (sendFormDataBtn) sendFormDataBtn.disabled = disabled;
};

const handleFormSubmit = async (mode) => {
  setOutput('');
  setStatus('');

  
  if (!agreementCheckbox || !agreementCheckbox.checked) {
    setStatus('Запрос не отправлен: поставьте галочку согласия на обработку данных.', 'crimson');
    return;
  }

  try {
    const data = collectFormValues();
    validateFormData(data);

    toggleButtonsDisabled(true);
    setStatus(
      mode === 'json'
        ? 'Отправка данных (application/json)...'
        : 'Отправка данных (multipart/form-data)...',
      '#333'
    );

    const result =
      mode === 'json'
        ? await sendAsJson(data)
        : await sendAsFormData(form, data);

    setStatus(
      mode === 'json'
        ? 'Успешно отправлено как application/json!'
        : 'Успешно отправлено как multipart/form-data (FormData)!',
      'green'
    );
    setOutput(result);
    console.log(`[${mode.toUpperCase()}] Ответ сервера:`, result);
  } catch (error) {
    const errorText =
      error instanceof TypeError
        ? `Сетевая ошибка или проблема соединения: ${error.message}`
        : error.message || 'Неизвестная ошибка при отправке формы.';

    setStatus(`Ошибка: ${errorText}`, 'crimson');
    setOutput(errorText);
    console.warn(`[${mode.toUpperCase()}] Ошибка:`, error);
  } finally {
    toggleButtonsDisabled(false);
  }
};

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormSubmit('json');
  });
}

if (sendFormDataBtn) {
  sendFormDataBtn.addEventListener('click', () => {
    handleFormSubmit('formdata');
  });
}