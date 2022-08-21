import CategorySelect from '@/components/CategorySelect/CategorySelect.vue'
export default {
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
    } 
  },
  components: {
    CategorySelect
  },
  methods: {
    getattrInfo(attrid) {
      if (attrid.V == 1) {
        this.category2Id = ''
        this.category3Id = ''
        this.category1Id = attrid.id
      } else if (attrid.V == 2) {
        this.category3Id = ''
        this.category2Id = attrid.id
      } else {
        this.category3Id = attrid.id
        this.getdata()
      }
    }
  }
}