function detectCollisionPointRect(point, rect) {
  if (point.pos.x > rect.pos.x - rect.size / 2 &&
    point.pos.x < rect.pos.x + rect.size / 2 &&
    point.pos.y > rect.pos.y - rect.size / 2 &&
    point.pos.y < rect.pos.y + rect.size / 2) {
    return true;
  } else {
    return false;
  }
}

function detectCollisionRectRect(rect1, rect2) {
  if (rect1.pos.x + rect1.size / 2 > rect2.pos.x - rect2.size / 2 &&
    rect1.pos.x - rect1.size / 2 < rect2.pos.x + rect2.size / 2 &&
    rect1.pos.y + rect1.size / 2 > rect2.pos.y - rect2.size / 2 &&
    rect1.pos.y - rect1.size / 2 < rect2.pos.y + rect2.size / 2) {
    return true;
  } else {
    return false;
  }
}

function detectCollisionNexus(rect, nex) {
  if (rect.pos.x + rect.size / 2 > nex.pos.x - nex.size / 2 + 10 &&
    rect.pos.x - rect.size / 2 < nex.pos.x + nex.size / 2 - 10 &&
    rect.pos.y + rect.size / 2 > nex.pos.y - nex.size / 2 + 10 &&
    rect.pos.y - rect.size / 2 < nex.pos.y + nex.size / 2 - 10) {
    return true;
  } else {
    return false;
  }
}

function pushBack(rect, nex) {
  if (rect.pos.x + rect.size / 2 < nex.pos.x - nex.size / 2 + 15 && rect.pos.y - rect.size / 2 < nex.pos.y - 10 + nex.size / 2 && rect.pos.y + rect.size / 2 > nex.pos.y - nex.size / 2 + 10) {
    rect.pos.x = nex.pos.x - nex.size / 2 - rect.size / 2 + 10;
  }
  if (rect.pos.x - rect.size / 2 > nex.pos.x + nex.size / 2 - 15 && rect.pos.y - rect.size / 2 < nex.pos.y - 10 + nex.size / 2 && rect.pos.y + rect.size / 2 > nex.pos.y - nex.size / 2 + 10) {
    rect.pos.x = nex.pos.x + nex.size / 2 + rect.size / 2 - 10;
  }
  if (rect.pos.y + rect.size / 2 < nex.pos.y - nex.size / 2 + 15 && rect.pos.x - rect.size / 2 < nex.pos.x - 10 + nex.size / 2 && rect.pos.x + rect.size / 2 > nex.pos.x - nex.size / 2 + 10) {
    rect.pos.y = nex.pos.y - nex.size / 2 - rect.size / 2 + 10;
  }
  if (rect.pos.y - rect.size / 2 > nex.pos.y + nex.size / 2 - 15 && rect.pos.x - rect.size / 2 < nex.pos.x - 10 + nex.size / 2 && rect.pos.x + rect.size / 2 > nex.pos.x - nex.size / 2 + 10) {
    rect.pos.y = nex.pos.y + nex.size / 2 + rect.size / 2 - 10;
  }
}

function insideNexus(rect, nex) {
  if (rect.pos.x + rect.size / 2 > nex.pos.x - nex.size / 2 + 20 &&
    rect.pos.x - rect.size / 2 < nex.pos.x + nex.size / 2 - 20 &&
    rect.pos.y + rect.size / 2 > nex.pos.y - nex.size / 2 + 20 &&
    rect.pos.y - rect.size / 2 < nex.pos.y + nex.size / 2 - 20) {
    return true;
  } else {
    return false;
  }
}
