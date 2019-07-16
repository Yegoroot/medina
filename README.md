## Table of Contents

- [Demo](#demo)

## Если что то не так с ... :

### route (не обновляет) то посмотри ProtectRoute и можешь добавить

> pay attention of

```
export default connect(
  state => ({
    auth: state[moduleName]
  }),
  null,
  null,
  { pure: false }
)(PrivateRoute);
```
