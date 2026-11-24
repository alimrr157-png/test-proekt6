{
  "usd"; 87.38
}

const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;
let autoSlideInterval = null;

const showBlock = (index = 0) => {
    currentIndex = index;
    tabBlocks.forEach((block, i) => block.classList.toggle('active', i === currentIndex));
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === currentIndex));
};

const startAutoSlide = () => {
    clearInterval(autoSlideInterval);
    if (!tabs.length) return;

    autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % tabs.length;
        showBlock(nextIndex);
    }, 3000);
};

if (tabBlocks.length > 0 && tabs.length > 0) {
    showBlock(0);
    startAutoSlide();
}

if (tabsParent) {
    tabsParent.onclick = (event) => {
        const selectedElement = event.target.closest('.tab_content_item');
        if (!selectedElement) return;

        const index = [...tabs].indexOf(selectedElement);
        if (index !== -1) {
            showBlock(index);
            startAutoSlide(); // сбрасываем таймер 3 сек при ручном клике, чтобы не переключило мгновенно
        }
    };
}