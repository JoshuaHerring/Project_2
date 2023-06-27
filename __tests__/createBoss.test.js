const request = require('supertest');
const url = "http://localhost:8080"

describe('Test all my routes', () => {    
    test('should insert a doc into collection', async () => {
        
    const payload = {
        Name: 'mockboss',
        Strengths: 'mockboss',
        Weakneses: 'mockboss',
        AttackType: 'mockboss',
        Parryable: 'mockboss',
        StanceBreakable: 'mockboss',
        Critical: 'mockboss'
      } ;

    const res = await request(url).post("/bosses").send(payload).expect(201)

    id = res.text.split(":")[2].replace('"', "").replace("}", "").replace('"', "")
});

test("Should get all docs from the collection", async () => {
    const res = await request(url).get("/bosses").expect(200)
})

test("Should get a doc from the collection", async () => {
    const res = await request(url).get("/bosses/" + id).expect(200)
})

test("Should update a doc from the collection", async () => {

    const payload = {
        Name: 'mockboss update',
        Strengths: 'mockboss update',
        Weakneses: 'mockboss update',
        AttackType: 'mockboss update',
        Parryable: 'mockboss update',
        StanceBreakable: 'mockboss update',
        Critical: 'mockboss update'
      } ;
    const res = await request(url).put("/bosses/" + id).send(payload).expect(204)
})


test("Should remove a doc from the collection", async () => {
    const res = await request(url).delete("/bosses/" + id).expect(200)
})


});
