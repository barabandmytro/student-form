// Автоматичне форматування телефонних номерів
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('380')) {
                    value = '+' + value;
                } else if (value.startsWith('0') && value.length <= 10) {
                    value = '+38' + value;
                }
                e.target.value = value;
            });
        });
        
        // Обробка радіо кнопок - додавання візуальних ефектів
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const groupName = this.name;
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                    r.closest('.radio-option').classList.remove('selected');
                });
                this.closest('.radio-option').classList.add('selected');
            });
        });
        
        // Обробка вибору типу першого опікуна
        document.getElementById('guardian1Type').addEventListener('change', function() {
            const value = this.value;
            const label = document.getElementById('guardian1Label');
            const phoneLabel = document.getElementById('guardian1PhoneLabel');
            const workLabel = document.getElementById('guardian1WorkLabel');
            
            // Оновлюємо підписи для першого опікуна
            switch(value) {
                case 'mother':
                    label.textContent = 'матері';
                    phoneLabel.textContent = 'матері';
                    workLabel.textContent = 'матері';
                    break;
                case 'father':
                    label.textContent = 'батька';
                    phoneLabel.textContent = 'батька';
                    workLabel.textContent = 'батька';
                    break;
                case 'female_guardian':
                    label.textContent = 'опікунки';
                    phoneLabel.textContent = 'опікунки';
                    workLabel.textContent = 'опікунки';
                    break;
                case 'male_guardian':
                    label.textContent = 'опікуна';
                    phoneLabel.textContent = 'опікуна';
                    workLabel.textContent = 'опікуна';
                    break;
                default:
                    label.textContent = 'першого опікуна';
                    phoneLabel.textContent = 'першого опікуна';
                    workLabel.textContent = 'першого опікуна';
            }
            
            // Оновлюємо варіанти для другого опікуна
            updateSecondGuardianOptions(value);
        });
        
        // Функція для оновлення варіантів другого опікуна
        function updateSecondGuardianOptions(firstGuardianType) {
            const secondGuardianSelect = document.getElementById('guardian2Type');
            const currentValue = secondGuardianSelect.value;
            
            // Очищуємо всі опції крім першої
            secondGuardianSelect.innerHTML = '<option value="">Оберіть...</option>';
            
            // Додаємо доступні опції в залежності від першого вибору
            const allOptions = [
                { value: 'mother', text: 'Мати' },
                { value: 'father', text: 'Батько' },
                { value: 'female_guardian', text: 'Опікунка (жінка)' },
                { value: 'male_guardian', text: 'Опікун (чоловік)' }
            ];
            
            allOptions.forEach(option => {
                if (option.value !== firstGuardianType) {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    secondGuardianSelect.appendChild(optionElement);
                }
            });
            
            // Додаємо опцію "Немає другого опікуна"
            const noneOption = document.createElement('option');
            noneOption.value = 'none';
            noneOption.textContent = 'Немає другого опікуна';
            secondGuardianSelect.appendChild(noneOption);
            
            // Відновлюємо попередній вибір, якщо він ще доступний
            if (currentValue && currentValue !== firstGuardianType) {
                secondGuardianSelect.value = currentValue;
            } else {
                secondGuardianSelect.value = '';
                // Приховуємо поля якщо вибір скинувся
                document.getElementById('guardian2Fields').style.display = 'none';
            }
        }
        
        // Обробка вибору типу другого опікуна
        document.getElementById('guardian2Type').addEventListener('change', function() {
            const value = this.value;
            const label = document.getElementById('guardian2Label');
            const phoneLabel = document.getElementById('guardian2PhoneLabel');
            const workLabel = document.getElementById('guardian2WorkLabel');
            const fieldsDiv = document.getElementById('guardian2Fields');
            
            if (value === 'none') {
                fieldsDiv.style.display = 'none';
                // Очищуємо поля
                document.getElementById('guardian2Name').value = '';
                document.getElementById('guardian2Phone').value = '';
                document.getElementById('guardian2Work').value = '';
            } else {
                fieldsDiv.style.display = 'block';
                
                switch(value) {
                    case 'mother':
                        label.textContent = 'матері';
                        phoneLabel.textContent = 'матері';
                        workLabel.textContent = 'матері';
                        break;
                    case 'father':
                        label.textContent = 'батька';
                        phoneLabel.textContent = 'батька';
                        workLabel.textContent = 'батька';
                        break;
                    case 'female_guardian':
                        label.textContent = 'опікунки';
                        phoneLabel.textContent = 'опікунки';
                        workLabel.textContent = 'опікунки';
                        break;
                    case 'male_guardian':
                        label.textContent = 'опікуна';
                        phoneLabel.textContent = 'опікуна';
                        workLabel.textContent = 'опікуна';
                        break;
                    default:
                        label.textContent = 'другого опікуна';
                        phoneLabel.textContent = 'другого опікуна';
                        workLabel.textContent = 'другого опікуна';
                }
            }
        });
        
        // Обробка відправки форми
        document.getElementById('studentForm').addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Відправляється...';
        });
        
        // Перевірка на успішну відправку
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('studentForm').style.display = 'none';
        }