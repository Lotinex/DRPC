const state = {
    timeStamp: new Date()
};

const get = id => document.getElementById(id);
get('OK').addEventListener('click', e => {
    if(get('id').value == ''){
        return alert('ID를 입력하세요.');
    }
    const R = {
        details: get('detail').value,
        instance: true,
        largeImageText: get('image-L-text').value,
        largeImageKey: get('image-L-id').value,
    };
    if(get('image-S-id').value !== ''){
        R.smallImageKey = get('image-S-id').value;
        R.smallImageText = get('image-S-text').value;
    }
    if(get('time').checked) {
        R.startTimestamp = state.timeStamp;
    }
    window.api.send('OK', {
        info: R,
        id: get('id').value
    })
    window.api.on('res', data => {
        if(data.res !== 200) alert('뭔가 문제가 발생했습니다!')
        else alert('성공적으로 설정했습니다.')
    })
})
