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

//모달 공지
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');

modalClose.addEventListener('click', () => {
  modal.style.display='none';
});

// 소원의 돌
const { createClient } = supabase;
const supabaseUrl = 'https://uhnwatyeyjgvbzgpgcny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobndhdHlleWpndmJ6Z3BnY255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3MDI5NDMsImV4cCI6MjA0MDI3ODk0M30.Dxoyl_bSad73ORtm9L8ccSmMfSbtQzDrMy0tixaL3DM';
const _supabase = createClient(supabaseUrl, supabaseKey);

async function addWish() {
    const name = document.getElementById('name').value;
    const wish = document.getElementById('wish').value;

    if (name && wish) {
        try {
            const { data, error } = await _supabase
                .from('wishes')
                .insert([{ name, wish }]);

            if (error) throw error;

            // 입력 필드 초기화
            document.getElementById('name').value = '';
            document.getElementById('wish').value = '';
        } catch (error) {
            console.error('Error adding wish:', error);
            alert('소원을 추가하는 중 오류가 발생했습니다.');
        }
    } else {
        alert("이름과 소원을 입력해 주세요.");
    }
}

function renderWishItem(wish) {
    const wishList = document.getElementById('wish-scroll');
    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.innerHTML = `<strong>${wish.name}</strong>: ${wish.wish}`;
    wishList.prepend(wishItem);
}

// 초기 소원 목록 로드
async function loadWishes() {
    try {
        const { data, error } = await _supabase
            .from('wishes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        data.forEach(renderWishItem);
    } catch (error) {
        console.error('Error loading wishes:', error);
    }
}

// 소원 목록 실시간 업데이트
function subscribeToWishes() {
    _supabase
        .channel('db-changes')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'wishes'
            },
            (payload) => {
                console.log('New wish received:', payload.new);
                renderWishItem(payload.new);
            })
        .subscribe((status) => {
            console.log('Subscription status:', status);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadWishes();
    subscribeToWishes();
});

// 메인 페이지로 가는 함수
function goToMainPage() {
    window.location.href = 'index.html'; // 메인 페이지의 경로를 지정합니다.
}
