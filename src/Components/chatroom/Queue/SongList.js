let list = []

class SongList {
    add(uri) {
        list.push(uri);
    }

    getList() {
        return list;
    }
}

export default SongList;