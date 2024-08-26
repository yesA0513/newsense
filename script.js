function showContent(company) {
    const contentArea = document.getElementById('content-area');
    let content = '';

    switch (company) {
        case 'car':
            content = '<h2>뉴센스 모터스</h2><p>세계적인 브랜드 르노와의 협력을 통해 대한민국 5대 완성차 제조업체로 성장하고 있습니다.</p><p>뉴센스 모터스는 장인 정신으로 명차와 명품을 만듭니다...</p>';
            break;
        case 'broadcast':
            content = '<h2>뉴센스 브로드캐스트</h2><p>시청자를 이해하는 방송 프로그램을 제작합니다.</p>';
            break;
        case 'publishing':
            content = '<h2>뉴센스 출판</h2><p>대량 출판부터 소량까지 합리적인 방법으로 도서 등의 출판을 기획합니다.</p>';
            break;
        case 'book':
            content = '<h2>뉴센스 문고</h2><p>뉴센스 출판 독점 계약으로 다양한 컨텐츠를 제공합니다.</p>';
            break;
        case 'brand':
            content = '<h2>뉴센스 STANDARD</h2><p>뉴신사의 자체 브랜드로 고품질 옷을 생산 및 판매합니다.</p>';
            break;
        case 'wear':
            content = '<h2>뉴 신 사</h2><p>뉴센스 그룹이 내세운 새로운 의류 거래 플랫폼. 자체 브랜드 뉴탠다드를 가지고 있습니다.</p>';
            break;
        case 'building':
            content = '<h2>뉴센스 Field</h2><p>여가, 문화, 편의생활을 한번에 해결할 수 있는 복합 건물. 다양한 파트너사가 입점해있습니다.</p>';
            break;
        case 'media':
            content = '<h2>뉴플릭스 / 뉴빙</h2><p>국내를 넘어 세계로 뻗어나가는 K-컨텐츠와 독점 컨텐츠를 제공합니다.</p>';
            break;
        default:
            content = '<p>계열사를 선택해 주세요.</p>';
    }

    contentArea.innerHTML = content;
}

function addWish() {
    const name = document.getElementById('name').value;
    const wish = document.getElementById('wish').value;
    const wishList = document.getElementById('wish-scroll');

    if (name && wish) {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `<strong>${name}</strong>: ${wish}`;
        wishList.appendChild(wishItem);

        // 입력 필드 초기화
        document.getElementById('name').value = '';
        document.getElementById('wish').value = '';
    } else {
        alert("이름과 소원을 입력해 주세요.");
    }
}

// 메인 페이지로 가는 함수
function goToMainPage() {
    window.location.href = 'index.html'; // 메인 페이지의 경로를 지정합니다.
}
