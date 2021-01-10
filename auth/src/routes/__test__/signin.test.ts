import request from "supertest";
import { app } from "../../app";

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  return request(app).post("/api/users/signin").send({}).expect(400);
});

it("fails when an email does not exist is given", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});

it("fails when an incorrect password is given", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(400);
});

it("returns a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
